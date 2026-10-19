import { CFG, LAP, POIS, RESERVE } from '../config';

export type Pt = { km: number; lat: number; lng: number; ele: number };

export type GpxResult = { points: Pt[]; error: string | null };

const R = 6371;

export function haversine(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const p = Math.PI / 180;
  const dLa = (bLat - aLat) * p;
  const dLo = (bLng - aLng) * p;
  const la1 = aLat * p;
  const la2 = bLat * p;
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function reserveElev(k: number): number {
  const km = ((k % LAP) + LAP) % LAP;
  const use = km < 1e-6 && k > 1 ? LAP : km;
  if (use <= RESERVE[0][0]) return RESERVE[0][1];
  for (let i = 1; i < RESERVE.length; i++) {
    if (use <= RESERVE[i][0]) {
      const [k0, e0] = RESERVE[i - 1];
      const [k1, e1] = RESERVE[i];
      const f = (use - k0) / (k1 - k0 || 1);
      return e0 + (e1 - e0) * f;
    }
  }
  return RESERVE[RESERVE.length - 1][1];
}

function numAttr(el: Element, name: string): number {
  const v = el.getAttribute(name);
  return v == null ? NaN : Number(v);
}

export function parseGpx(xml: string): GpxResult {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    return { points: [], error: 'Fant ikke nok sporpunkter i filen.' };
  }
  const nodes = Array.from(doc.getElementsByTagName('trkpt'));
  if (nodes.length < 50) {
    return { points: [], error: 'Fant ikke nok sporpunkter i filen.' };
  }

  type Raw = { lat: number; lng: number; ele: number | null; cum: number };
  const raw: Raw[] = [];
  let cum = 0;
  for (const node of nodes) {
    const lat = numAttr(node, 'lat');
    const lng = numAttr(node, 'lon');
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    const eleNode = node.getElementsByTagName('ele')[0];
    const ele = eleNode ? Number(eleNode.textContent) : null;
    if (raw.length) {
      const prev = raw[raw.length - 1];
      cum += haversine(prev.lat, prev.lng, lat, lng);
    }
    raw.push({ lat, lng, ele: Number.isFinite(ele as number) ? (ele as number) : null, cum });
  }
  if (raw.length < 50) return { points: [], error: 'Fant ikke nok sporpunkter i filen.' };

  let track = raw;
  const total0 = raw[raw.length - 1].cum;
  if (total0 > 30) {
    const half = total0 / 2;
    track = raw.filter((p) => p.cum <= half + 1e-6);
    const base = track[0]?.cum ?? 0;
    track = track.map((p) => ({ ...p, cum: p.cum - base }));
  }

  const total = track[track.length - 1].cum;
  if (total < 18 || total > 24) {
    const shown = total.toFixed(1).replace('.', ',');
    return {
      points: [],
      error: `Sporet er ${shown} km. Forventet én runde på ca. 21,1 km (eller maraton på 42,2 km).`,
    };
  }

  const scaled = track.map((p) => ({
    km: (p.cum * LAP) / total,
    lat: p.lat,
    lng: p.lng,
    ele: p.ele,
  }));
  scaled[scaled.length - 1].km = LAP;

  const haveEle = scaled.filter((p) => p.ele != null).length > scaled.length * 0.5;
  const resampled = resample(scaled, haveEle);
  smoothEle(resampled, CFG.smoothSamples);
  return { points: resampled, error: null };
}

function atScaled(
  pts: { km: number; lat: number; lng: number; ele: number | null }[],
  k: number,
): { lat: number; lng: number; ele: number | null } {
  if (k <= pts[0].km) return pts[0];
  if (k >= pts[pts.length - 1].km) return pts[pts.length - 1];
  let lo = 0;
  let hi = pts.length - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].km <= k) lo = mid;
    else hi = mid;
  }
  const a = pts[lo];
  const b = pts[hi];
  const f = (k - a.km) / (b.km - a.km || 1);
  return {
    lat: a.lat + (b.lat - a.lat) * f,
    lng: a.lng + (b.lng - a.lng) * f,
    ele: a.ele == null || b.ele == null ? null : a.ele + (b.ele - a.ele) * f,
  };
}

function resample(
  pts: { km: number; lat: number; lng: number; ele: number | null }[],
  haveEle: boolean,
): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; ; i++) {
    const k = i / 100;
    if (k >= LAP - 1e-9) break;
    const p = atScaled(pts, k);
    out.push({ km: k, lat: p.lat, lng: p.lng, ele: haveEle && p.ele != null ? p.ele : reserveElev(k) });
  }
  const end = atScaled(pts, LAP);
  out.push({
    km: LAP,
    lat: end.lat,
    lng: end.lng,
    ele: haveEle && end.ele != null ? end.ele : reserveElev(LAP),
  });
  return out;
}

function smoothEle(pts: Pt[], n: number): void {
  const src = pts.map((p) => p.ele);
  for (let i = 0; i < pts.length; i++) {
    let s = 0;
    let c = 0;
    for (let j = i - n; j <= i + n; j++) {
      if (j >= 0 && j < src.length) {
        s += src[j];
        c++;
      }
    }
    pts[i].ele = s / c;
  }
}

/** Omtrentlig trasé gjennom POI-ene når GPX ikke kan brukes. */
export function approximateCourse(): Pt[] {
  const anchors = POIS.filter((p) => p.km != null && !p.fullOnly)
    .map((p) => ({ km: p.km as number, lat: p.lat, lng: p.lng, ele: reserveElev(p.km as number) }))
    .sort((a, b) => a.km - b.km);
  const start = anchors[0];
  if (!anchors.length || anchors[anchors.length - 1].km < LAP - 0.01) {
    anchors.push({ km: LAP, lat: start?.lat ?? 60.39757, lng: start?.lng ?? 5.32455, ele: reserveElev(LAP) });
  }
  return resample(anchors, false);
}

function intoLap(k: number): number {
  if (k <= 0) return 0;
  const laps = Math.floor((k + 1e-9) / LAP);
  const m = k - laps * LAP;
  if (m < 1e-4) return laps === 0 ? 0 : LAP;
  return Math.min(LAP, m);
}

export function elevAt(pts: Pt[], k: number): number {
  if (!pts.length) return reserveElev(k);
  const km = intoLap(k);
  if (km <= pts[0].km) return pts[0].ele;
  if (km >= pts[pts.length - 1].km) return pts[pts.length - 1].ele;
  let lo = 0;
  let hi = pts.length - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].km <= km) lo = mid;
    else hi = mid;
  }
  const a = pts[lo];
  const b = pts[hi];
  const f = (km - a.km) / (b.km - a.km || 1);
  return a.ele + (b.ele - a.ele) * f;
}

export function pointAt(pts: Pt[], k: number): { lat: number; lng: number } {
  if (!pts.length) return { lat: 60.39757, lng: 5.32455 };
  const km = intoLap(k);
  if (km <= pts[0].km) return { lat: pts[0].lat, lng: pts[0].lng };
  if (km >= pts[pts.length - 1].km) {
    const p = pts[pts.length - 1];
    return { lat: p.lat, lng: p.lng };
  }
  let lo = 0;
  let hi = pts.length - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].km <= km) lo = mid;
    else hi = mid;
  }
  const a = pts[lo];
  const b = pts[hi];
  const f = (km - a.km) / (b.km - a.km || 1);
  return { lat: a.lat + (b.lat - a.lat) * f, lng: a.lng + (b.lng - a.lng) * f };
}

export function courseId(name: string, pts: Pt[]): string {
  if (!pts.length) return name;
  const a = pts[0];
  const b = pts[pts.length - 1];
  return `${name}|${pts.length}|${a.lat.toFixed(5)}|${b.ele.toFixed(1)}`;
}
