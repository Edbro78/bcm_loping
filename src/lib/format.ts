/** Tall, tider og klokkeslett på norsk bokmål. */

export function fmtT(s: number): string {
  const neg = s < -0.5;
  let x = Math.round(Math.abs(s));
  const h = Math.floor(x / 3600);
  const m = Math.floor((x % 3600) / 60);
  const sec = x % 60;
  const body =
    h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      : `${m}:${String(sec).padStart(2, '0')}`;
  return neg ? `−${body}` : body;
}

export function fmtP(s: number): string {
  return fmtT(Math.max(0, s));
}

export function nb(v: number, d = 1): string {
  const neg = v < 0 && Math.abs(v) > 0;
  const factor = 10 ** d;
  const shifted = Math.abs(v) * factor;
  const rounded = Math.floor(shifted + 0.5 + 1e-6) / factor;
  const body = rounded.toFixed(d).replace('.', ',');
  return (neg ? '−' : '') + body;
}

export function sgn(v: number, d = 1): string {
  if (Math.abs(v) < 0.05) return `±${(0).toFixed(d).replace('.', ',')}`;
  const body = Math.abs(v).toFixed(d).replace('.', ',');
  return `${v > 0 ? '+' : '−'}${body}`;
}

export function sgnS(s: number): string {
  const r = Math.round(s);
  if (Math.abs(r) < 1) return '±0 s';
  const sign = r > 0 ? '+' : '−';
  const a = Math.abs(r);
  if (a >= 60) {
    const m = Math.floor(a / 60);
    const sec = a % 60;
    return `${sign}${m}:${String(sec).padStart(2, '0')}`;
  }
  return `${sign}${a} s`;
}

export function clockS(start: string, t: number): string {
  const [hs, ms] = start.split(':');
  const h = Number(hs) || 0;
  const m = Number(ms) || 0;
  const total = (((h * 3600 + m * 60 + Math.round(t)) % 86400) + 86400) % 86400;
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function clockDot(start: string, t: number): string {
  return clockS(start, t).replace(':', '.');
}

/** `t:mm:ss` → sekunder. `t:mm` tolkes som timer:minutter. */
export function parseT(str: string): number | null {
  const s = str.trim();
  if (!s) return null;
  const p = s.split(':');
  if (p.length < 2 || p.length > 3) return null;
  if (p.some((x) => x === '' || !/^\d+$/.test(x))) return null;
  const n = p.map(Number);
  if (p.length === 3) {
    const [h, m, sec] = n;
    if (m > 59 || sec > 59) return null;
    return h * 3600 + m * 60 + sec;
  }
  const [h, m] = n;
  if (m > 59) return null;
  return h * 3600 + m * 60;
}

export function kmL(k: number): string {
  const r = Math.round(k * 10) / 10;
  if (Math.abs(r - Math.round(r)) < 1e-6) return String(Math.round(r));
  return r.toFixed(1).replace('.', ',');
}

export function quickLabel(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return `sub ${h}:${String(m).padStart(2, '0')}`;
}

export function dateDM(d: Date): string {
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}`;
}

export function listNb(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} og ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} og ${items[items.length - 1]}`;
}
