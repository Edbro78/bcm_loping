import {
  CFG,
  CUTOFF_FULL,
  HILLS,
  HillKey,
  LAP,
  MAX_TIME,
  SplitKey,
  STATIONS,
  FULL_EXTRA_STATION,
} from '../config';
import { fmtP, fmtT, kmL, listNb } from './format';
import { elevAt as elevAtPts, type Pt } from './gpx';

export function gapF(g: number): number {
  const x = Math.max(-CFG.clip, Math.min(CFG.clip, g));
  return x >= 0 ? 1 + CFG.up[0] * x + CFG.up[1] * x * x : 1 + CFG.dn[0] * x + CFG.dn[1] * x * x;
}

export type RoundSeg = { x0: number; d: number; g: number; f: number; e0: number; e1: number };

export function roundSegments(elev: (k: number) => number): RoundSeg[] {
  const out: RoundSeg[] = [];
  for (let i = 0; i < 400; i++) {
    const x0 = i * CFG.seg;
    if (x0 >= LAP - 1e-9) break;
    const d = Math.min(CFG.seg, LAP - x0);
    const e0 = elev(x0);
    const e1 = elev(x0 + d);
    const g = Math.max(-CFG.clip, Math.min(CFG.clip, ((e1 - e0) / (d * 1000)) * 100));
    out.push({ x0, d, g, f: gapF(g), e0, e1 });
  }
  return out;
}

export type Seg = {
  x0: number;
  d: number;
  g: number;
  f: number;
  w: number;
  t: number;
  stop: number;
  cs: number;
  ce: number;
  lap: number;
};

export type Agg = { t: number; fd: number; up: number; dn: number; stops: number; len: number };

export type Warning = { level: 'error' | 'warn'; title: string; text: string };

export type PlanInput = {
  full: boolean;
  T: number;
  split: SplitKey;
  sigma: number;
  hill: HillKey;
  stopSec: number;
  start: string;
};

export type Plan = {
  input: PlanInput;
  D: number;
  p0: number;
  p0mid: number;
  S: number;
  stations: number[];
  segs: Seg[];
  rounds: RoundSeg[];
  tAt: (x: number) => number;
  agg: (a: number, b: number) => Agg;
  elev: { up: number; high: number; steep: number };
  warnings: Warning[];
};

export function stationList(full: boolean): number[] {
  const laps = full ? 2 : 1;
  const out: number[] = [];
  for (let l = 0; l < laps; l++) for (const s of STATIONS) out.push(s + l * LAP);
  if (full) out.push(FULL_EXTRA_STATION);
  out.sort((a, b) => a - b);
  return out;
}

function buildSegs(
  rounds: RoundSeg[],
  input: Omit<PlanInput, 'start' | 'hill'> & { hill: HillKey },
  stations: number[],
): { segs: Seg[]; p0: number; S: number } {
  const { full, T, split, sigma, hill, stopSec } = input;
  const laps = full ? 2 : 1;
  const D = LAP * laps;
  const H = HILLS[hill];
  const ss = split === 'negativ' ? sigma / 100 : split === 'positiv' ? -sigma / 100 : 0;
  const S = stations.length * stopSec;

  const draft: Omit<Seg, 't' | 'cs' | 'ce' | 'stop'>[] = [];
  for (let l = 0; l < laps; l++) {
    for (const s of rounds) {
      const x0 = s.x0 + l * LAP;
      const d = s.d;
      const xm = x0 + d / 2;
      const lk = s.x0 + d / 2;
      const e = s.g >= CFG.thr ? H.up : s.g <= -CFG.thr ? H.dn : 1;
      const u = lk >= CFG.cobble[0] && lk <= CFG.cobble[1] ? CFG.cobbleU : 1;
      const sp = 1 + ss * (1 - (2 * xm) / D);
      const w = d * s.f * e * u * sp;
      draft.push({ x0, d, g: s.g, f: s.f, w, lap: l });
    }
  }
  const sumW = draft.reduce((a, s) => a + s.w, 0) || 1;
  const p0 = (T - S) / sumW;
  const used = new Set<number>();
  let cs = 0;
  const segs: Seg[] = draft.map((s) => {
    let stop = 0;
    stations.forEach((st, idx) => {
      if (used.has(idx)) return;
      if (st > s.x0 + 1e-9 && st <= s.x0 + s.d + 1e-6) {
        stop += stopSec;
        used.add(idx);
      }
    });
    const t = p0 * s.w;
    const ce = cs + t + stop;
    const seg: Seg = { ...s, t, stop, cs, ce };
    cs = ce;
    return seg;
  });
  return { segs, p0, S };
}

export function elevStats(rounds: RoundSeg[], full: boolean): { up: number; high: number; steep: number } {
  let ref = rounds[0]?.e0 ?? 0;
  let up = 0;
  let high = ref;
  let steep = -Infinity;
  for (const s of rounds) {
    if (s.e1 - ref >= 3) {
      up += s.e1 - ref;
      ref = s.e1;
    } else if (s.e1 < ref) ref = s.e1;
    if (s.e1 > high) high = s.e1;
    if (s.g > steep) steep = s.g;
  }
  if (full) up *= 2;
  return { up, high, steep: Number.isFinite(steep) ? steep : 0 };
}

function clockMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function cutoffExceeded(start: string, passSec: number): boolean {
  const pass = clockMinutes(start) + passSec / 60;
  const cut = clockMinutes(CUTOFF_FULL);
  return pass > cut;
}

function warningsFor(planBits: {
  input: PlanInput;
  D: number;
  segs: Seg[];
  tAt: (x: number) => number;
  agg: (a: number, b: number) => Agg;
}): Warning[] {
  const { input, D, tAt, agg } = planBits;
  const out: Warning[] = [];
  if (input.full && cutoffExceeded(input.start, tAt(LAP))) {
    const pass = tAt(LAP);
    const [h, m] = input.start.split(':').map(Number);
    const total = (h * 3600 + m * 60 + pass) % 86400;
    const hh = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const clock = `${String(hh).padStart(2, '0')}.${String(mm).padStart(2, '0')}`;
    out.push({
      level: 'error',
      title: 'Cut-off kl. 10.45',
      text: `Planen gir passering på Bryggen kl. ${clock}. Du blir stoppet og godkjent for halvmaraton.`,
    });
  }
  const max = input.full ? MAX_TIME.full : MAX_TIME.half;
  if (input.T > max) {
    out.push({
      level: 'error',
      title: 'Over makstid',
      text: `Makstiden er 4 timer for halv / 6 timer for hel. Målet ditt er ${fmtT(input.T)}.`,
    });
  }
  const bad: { km: string; pace: number }[] = [];
  for (let a = 0; a < D - 1e-6; a += 1) {
    const b = Math.min(D, a + 1);
    const g = agg(a, b);
    const pace = g.len > 0 ? (g.t + g.stops) / g.len : 0;
    if (pace < 180 || pace > 720) bad.push({ km: String(Math.round(a + 1)), pace });
  }
  if (bad.length) {
    const paces = bad.map((b) => b.pace);
    const lo = Math.min(...paces);
    const hi = Math.max(...paces);
    const paceTxt =
      Math.abs(lo - hi) < 1 ? `${fmtP(lo)}/km` : `${fmtP(lo)}–${fmtP(hi)}/km`;
    out.push({
      level: 'warn',
      title: 'Urealistisk mål',
      text: `Km ${listNb(bad.map((b) => b.km))} får målfart ${paceTxt} – utenfor 3:00–12:00/km.`,
    });
  }
  if (input.hill === 'fort' && input.split === 'positiv') {
    out.push({
      level: 'warn',
      title: 'Høy risiko',
      text: 'Fort i bakkene kombinert med positiv split legger mye innsats tidlig. Motbakkene på km 3–8 kan koste mer enn de gir.',
    });
  }
  return out;
}

export function buildPlan(elev: (k: number) => number, input: PlanInput): Plan {
  const rounds = roundSegments(elev);
  const stations = stationList(input.full);
  const { segs, p0, S } = buildSegs(rounds, input, stations);
  const mid = buildSegs(rounds, { ...input, hill: 'middels' }, stations);
  const D = input.full ? LAP * 2 : LAP;

  const tAt = (x: number): number => {
    if (x <= 0) return 0;
    if (x >= D - 1e-6) return input.T;
    let lo = 0;
    let hi = segs.length - 1;
    let ans = 0;
    while (lo <= hi) {
      const midI = (lo + hi) >> 1;
      if (segs[midI].x0 <= x + 1e-8) {
        ans = midI;
        lo = midI + 1;
      } else hi = midI - 1;
    }
    const s = segs[ans];
    if (x >= s.x0 + s.d - 1e-6) return s.ce;
    const f = Math.min(1, Math.max(0, (x - s.x0) / s.d));
    return s.cs + s.t * f;
  };

  const agg = (a: number, b: number): Agg => {
    let t = 0;
    let fd = 0;
    let up = 0;
    let dn = 0;
    const loK = Math.min(a, b);
    const hiK = Math.max(a, b);
    for (const s of segs) {
      const ov = Math.min(hiK, s.x0 + s.d) - Math.max(loK, s.x0);
      if (ov <= 0) continue;
      t += ov * (s.t / s.d);
      fd += ov * s.f;
      const rise = s.g * ov * 10;
      if (rise >= 0) up += rise;
      else dn += -rise;
    }
    let stops = 0;
    for (const st of stations) if (st > loK + 1e-9 && st <= hiK + 1e-9) stops += input.stopSec;
    return { t, fd, up, dn, stops, len: hiK - loK };
  };

  const elevInfo = elevStats(rounds, input.full);
  const partial = { input, D, segs, tAt, agg };
  return {
    input,
    D,
    p0,
    p0mid: mid.p0,
    S,
    stations,
    segs,
    rounds,
    tAt,
    agg,
    elev: elevInfo,
    warnings: warningsFor(partial),
  };
}

export function planFromPoints(pts: Pt[], input: PlanInput): Plan {
  return buildPlan((k) => elevAtPts(pts, k), input);
}

export function gradeOf(agg: Agg): number {
  if (agg.len <= 0) return 0;
  return (agg.up - agg.dn) / (agg.len * 10);
}

export function paceOf(agg: Agg): number {
  return agg.len > 0 ? (agg.t + agg.stops) / agg.len : 0;
}

export function gapOf(agg: Agg): number {
  return agg.fd > 0 ? agg.t / agg.fd : 0;
}

export function kmLabel(a: number, b: number, D: number): string {
  if (Math.abs(b - D) < 0.02 && b - a < 0.999) return kmL(b);
  return String(Math.round(a + 1));
}
