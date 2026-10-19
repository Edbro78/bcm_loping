/**
 * Formkrav fra VDOT (Jack Daniels) og Riegel.
 * Tallene er tabellen i «milepæler fra deep r.txt».
 * Et intervall «a - b» betyr at kravet er å løpe innenfor, eller raskere enn, øvre grense b.
 */

import { fmtT } from './format';

export type MileRaw = [string, number, string, string, string, string];

export const MILE_HALF: MileRaw[] = [
  ['1:00:00', 81.5, '7:30 - 7:35', '13:03 - 13:06', '27:12 - 27:17', '130 - 170+'],
  ['1:05:00', 74.2, '8:09 - 8:13', '14:08 - 14:11', '29:28 - 29:31', '115 - 150'],
  ['1:10:00', 68.1, '8:47 - 8:51', '15:13 - 15:17', '31:44', '100 - 130'],
  ['1:15:00', 62.9, '9:26 - 9:29', '16:18 - 16:22', '33:58 - 34:00', '85 - 115'],
  ['1:20:00', 58.4, '10:04 - 10:07', '17:23 - 17:27', '36:11 - 36:15', '75 - 100'],
  ['1:25:00', 54.5, '10:43 - 10:45', '18:29 - 18:32', '38:25 - 38:31', '65 - 85'],
  ['1:30:00', 51.0, '11:21 - 11:23', '19:34 - 19:36', '40:39 - 40:47', '55 - 75'],
  ['1:40:00', 45.1, '12:38 - 12:39', '21:44 - 21:46', '45:07 - 45:19', '45 - 60'],
  ['1:50:00', 40.4, '13:55', '23:55', '49:37 - 49:51', '40 - 50'],
  ['2:00:00', 36.5, '15:11 - 15:12', '26:04 - 26:05', '54:07 - 54:23', '35 - 45'],
  ['2:15:00', 31.7, '17:05 - 17:07', '29:19 - 29:21', '1:00:56 - 1:01:11', '30 - 40'],
  ['2:30:00', 27.9, '18:58 - 19:04', '32:35 - 32:36', '1:07:49 - 1:07:59', '25 - 35'],
  ['2:45:00', 24.8, '20:52 - 21:00', '35:52 - 35:53', '1:14:45 - 1:14:47', '20 - 30'],
];

export const MILE_FULL: MileRaw[] = [
  ['2:10:00', 78.4, '7:46 - 7:53', '13:32 - 13:33', '28:11 - 28:16', '140 - 190+'],
  ['2:20:00', 71.9, '8:23 - 8:30', '14:35 - 14:36', '30:20 - 30:26', '125 - 165'],
  ['2:30:00', 66.3, '9:00 - 9:06', '15:38', '32:29 - 32:36', '110 - 145'],
  ['2:40:00', 61.5, '9:37 - 9:42', '16:41', '34:38 - 34:47', '95 - 125'],
  ['2:50:00', 57.3, '10:15 - 10:19', '17:43 - 17:45', '36:48 - 36:57', '85 - 110'],
  ['3:00:00', 53.5, '10:52 - 10:55', '18:46 - 18:48', '38:59 - 39:08', '75 - 105'],
  ['3:15:00', 48.7, '11:49 - 11:50', '20:20 - 20:24', '42:17 - 42:23', '65 - 85'],
  ['3:30:00', 44.6, '12:44 - 12:46', '21:54 - 22:00', '45:37 - 45:39', '55 - 75'],
  ['3:45:00', 41.0, '13:39 - 13:44', '23:28 - 23:36', '48:55 - 48:58', '45 - 65'],
  ['4:00:00', 37.9, '14:34 - 14:42', '25:01 - 25:14', '52:10 - 52:22', '40 - 55'],
  ['4:15:00', 35.2, '15:28 - 15:40', '26:35 - 26:51', '55:26 - 55:47', '35 - 50'],
  ['4:30:00', 32.8, '16:23 - 16:38', '28:09 - 28:30', '58:42 - 59:13', '30 - 45'],
];

export const WF = [0.72, 0.78, 0.84, 0.68, 0.86, 0.92, 0.97, 0.74, 0.98, 1, 1, 0.7, 0.42];

export function parseT2(s: string): number {
  const p = s.trim().split(':').map(Number);
  if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
  if (p.length === 2) return p[0] * 60 + p[1];
  return NaN;
}

export function parseRange(s: string): [number, number] {
  const parts = s.split(/\s+-\s+/);
  if (parts.length === 1) {
    const v = parseT2(parts[0]);
    return [v, v];
  }
  return [parseT2(parts[0]), parseT2(parts[1])];
}

export function parseVol(s: string): [number, number] {
  const parts = s.replace(/\+/g, '').split(/\s+-\s+/).map((x) => Number(x.trim()));
  if (parts.length === 1) return [parts[0], parts[0]];
  return [parts[0], parts[1]];
}

export type MileRow = {
  label: string;
  g: number;
  vdot: number;
  k3: [number, number];
  k5: [number, number];
  k10: [number, number];
  vol: [number, number];
};

function parseTable(raw: MileRaw[]): MileRow[] {
  return raw.map(([label, vdot, k3, k5, k10, vol]) => ({
    label,
    g: parseT2(label),
    vdot,
    k3: parseRange(k3),
    k5: parseRange(k5),
    k10: parseRange(k10),
    vol: parseVol(vol),
  }));
}

const HALF = parseTable(MILE_HALF);
const FULL = parseTable(MILE_FULL);

const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
const lerpR = (a: [number, number], b: [number, number], f: number): [number, number] => [
  lerp(a[0], b[0], f),
  lerp(a[1], b[1], f),
];

export type MileHit = {
  rows: MileRow[];
  T: number;
  vdot: number;
  k3: [number, number];
  k5: [number, number];
  k10: [number, number];
  vol: [number, number];
  exact: boolean;
  outside: boolean;
  nearest: number;
  ri: number;
  aLabel: string;
  bLabel: string;
  nearestLabel: string;
};

export function lookupMilestones(full: boolean, T: number): MileHit {
  const rows = full ? FULL : HALF;
  const first = rows[0].g;
  const last = rows[rows.length - 1].g;
  const outside = T < first - 0.5 || T > last + 0.5;
  const tt0 = Math.min(last, Math.max(first, T));
  let ri = rows.length - 2;
  for (let i = 0; i < rows.length - 1; i++) {
    if (rows[i].g <= tt0 && tt0 <= rows[i + 1].g) {
      ri = i;
      break;
    }
  }
  const A = rows[ri];
  const B = rows[ri + 1];
  const fI = (tt0 - A.g) / (B.g - A.g || 1);
  const exactIdx = rows.findIndex((r) => Math.abs(r.g - T) < 1);
  const exact = exactIdx >= 0;
  const nearest = exact ? exactIdx : fI < 0.5 ? ri : ri + 1;
  const interp = {
    vdot: lerp(A.vdot, B.vdot, fI),
    k3: lerpR(A.k3, B.k3, fI),
    k5: lerpR(A.k5, B.k5, fI),
    k10: lerpR(A.k10, B.k10, fI),
    vol: [Math.round(lerp(A.vol[0], B.vol[0], fI)), Math.round(lerp(A.vol[1], B.vol[1], fI))] as [number, number],
  };
  const used = exact ? rows[exactIdx] : interp;
  return {
    rows,
    T,
    vdot: used.vdot,
    k3: used.k3,
    k5: used.k5,
    k10: used.k10,
    vol: exact ? rows[exactIdx].vol : interp.vol,
    exact,
    outside,
    nearest,
    ri,
    aLabel: A.label,
    bLabel: B.label,
    nearestLabel: rows[nearest].label,
  };
}

export function rngT(lo: number, hi: number): string {
  const a = fmtT(lo);
  if (Math.abs(lo - hi) < 0.5) return a;
  return `${a}–${fmtT(hi)}`;
}

export function weekKms(vol: [number, number]): number[] {
  const peak = (vol[0] + vol[1]) / 2;
  return WF.map((f) => Math.round(peak * f));
}

/** Første rad der øvre krav er minst grensen, ellers siste rad. */
export function slowerThan(rows: MileRow[], key: 'k3' | 'k5' | 'k10', limit: number): string {
  for (const r of rows) {
    if (r[key][1] >= limit - 0.5) return r.label;
  }
  return rows[rows.length - 1].label;
}

export const WEEK1 = new Date(Date.UTC(2027, 0, 25));

export function addDays(base: Date, days: number): Date {
  const d = new Date(base.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}
