import { describe, expect, it } from 'vitest';
import { nb } from './format';
import { lookupMilestones, rngT } from './milestones';

describe('milepæler', () => {
  it('treffer raden 1:30:00', () => {
    const m = lookupMilestones(false, 5400);
    expect(m.exact).toBe(true);
    expect(nb(m.vdot, 1)).toBe('51,0');
    expect(rngT(m.k3[0], m.k3[1])).toBe('11:21–11:23');
    expect(rngT(m.k5[0], m.k5[1])).toBe('19:34–19:36');
    expect(rngT(m.k10[0], m.k10[1])).toBe('40:39–40:47');
    expect(m.vol).toEqual([55, 75]);
    expect(m.nearestLabel).toBe('1:30:00');
  });

  it('interpolerer 1:35:00 mellom 1:30 og 1:40', () => {
    const m = lookupMilestones(false, 5700);
    expect(m.exact).toBe(false);
    expect(m.outside).toBe(false);
    expect(m.aLabel).toBe('1:30:00');
    expect(m.bLabel).toBe('1:40:00');
    expect(nb(m.vdot, 1)).toBe('48,1');
  });
});
