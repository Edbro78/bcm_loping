import { describe, expect, it } from 'vitest';
import { reserveElev } from './gpx';
import { buildPlan, cutoffExceeded } from './model';

const base = {
  full: false,
  T: 5400,
  split: 'jevn' as const,
  sigma: 2,
  hill: 'middels' as const,
  stopSec: 2,
  start: '09:00',
};

describe('tempoplan', () => {
  it('halv 1:30 middels jevn drikke av treffer målet og ligger bak ved 5 km', () => {
    const plan = buildPlan(reserveElev, base);
    expect(plan.tAt(21.097)).toBe(5400);
    expect(plan.S).toBe(10);
    expect(plan.tAt(5)).toBeGreaterThan(5 * (5400 / 21.097));
    const marks = [0, 3.2, 4.6, 8.2, 9.3, 12.3, 15.8, 21.097];
    for (let i = 1; i < marks.length; i++) {
      expect(plan.tAt(marks[i])).toBeGreaterThan(plan.tAt(marks[i - 1]));
    }
    expect(plan.tAt(4.6)).toBeLessThan(5400);
    expect(plan.tAt(8.2)).toBeLessThan(5400);
  });

  it('sakte gir lavere flatfart enn middels', () => {
    const mid = buildPlan(reserveElev, base);
    const slow = buildPlan(reserveElev, { ...base, hill: 'sakte' });
    expect(slow.p0).toBeLessThan(mid.p0);
  });

  it('varsler cut-off når passering av Bryggen er etter 10.45', () => {
    const plan = buildPlan(reserveElev, {
      ...base,
      full: true,
      T: 4.5 * 3600,
      start: '07:45',
    });
    const pass = plan.tAt(21.097);
    const over = cutoffExceeded('07:45', pass);
    const has = plan.warnings.some((w) => w.title.startsWith('Cut-off'));
    expect(has).toBe(over);

    const late = buildPlan(reserveElev, {
      ...base,
      full: true,
      T: 4.5 * 3600,
      start: '09:00',
    });
    expect(cutoffExceeded('09:00', late.tAt(21.097))).toBe(true);
    expect(late.warnings.some((w) => w.title.startsWith('Cut-off'))).toBe(true);
    expect(cutoffExceeded('07:45', 3 * 3600)).toBe(false);
    expect(cutoffExceeded('07:45', 3 * 3600 + 30)).toBe(true);
  });
});
