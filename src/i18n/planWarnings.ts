import type { Locale } from '../state/previewLocale';
import { fmtP, fmtT, listNb } from '../lib/format';
import { uiFor } from './useUi';
import type { PlanInput } from '../lib/model';
import { CUTOFF_FULL, LAP, MAX_TIME } from '../config';

export type Warning = { level: 'error' | 'warn'; title: string; text: string };

type Agg = { t: number; fd: number; up: number; dn: number; stops: number; len: number };

function clockMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function cutoffExceeded(start: string, passSec: number): boolean {
  const pass = clockMinutes(start) + passSec / 60;
  const cut = clockMinutes(CUTOFF_FULL);
  return pass > cut;
}

export function planWarningsFor(
  partial: {
    input: PlanInput;
    D: number;
    tAt: (x: number) => number;
    agg: (a: number, b: number) => Agg;
  },
  locale: Locale,
): Warning[] {
  const w = uiFor(locale).planWarnings;
  const { input, D, tAt, agg } = partial;
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
      title: w.cutoff.title,
      text: w.cutoff.text.replace('{clock}', clock),
    });
  }

  const max = input.full ? MAX_TIME.full : MAX_TIME.half;
  if (input.T > max) {
    out.push({
      level: 'error',
      title: w.maxTime.title,
      text: w.maxTime.text.replace('{goal}', fmtT(input.T)),
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
    const paceTxt = Math.abs(lo - hi) < 1 ? `${fmtP(lo)}/km` : `${fmtP(lo)}–${fmtP(hi)}/km`;
    out.push({
      level: 'warn',
      title: w.unrealistic.title,
      text: w.unrealistic.text.replace('{kms}', listNb(bad.map((b) => b.km))).replace('{pace}', paceTxt),
    });
  }

  if (input.hill === 'fort' && input.split === 'positiv') {
    out.push({
      level: 'warn',
      title: w.highRisk.title,
      text: w.highRisk.text,
    });
  }

  return out;
}
