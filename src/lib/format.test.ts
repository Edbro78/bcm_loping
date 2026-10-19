import { describe, expect, it } from 'vitest';
import { clockS, fmtP, fmtT, kmL, nb, parseT, sgn, sgnS } from './format';

describe('format', () => {
  it('formaterer tider', () => {
    expect(fmtT(90)).toBe('1:30');
    expect(fmtT(5400)).toBe('1:30:00');
    expect(fmtT(-8)).toBe('−0:08');
    expect(fmtP(256)).toBe('4:16');
  });

  it('parser t:mm som timer og minutter', () => {
    expect(parseT('1:30:00')).toBe(5400);
    expect(parseT('1:30')).toBe(5400);
    expect(parseT('abc')).toBeNull();
  });

  it('bruker desimalkomma og ekte minus', () => {
    expect(nb(51, 1)).toBe('51,0');
    expect(nb(-1.2, 1)).toBe('−1,2');
    expect(sgn(0.02)).toBe('±0,0');
    expect(sgn(1.2)).toBe('+1,2');
    expect(sgn(-0.4)).toBe('−0,4');
    expect(sgnS(12)).toBe('+12 s');
    expect(sgnS(-8)).toBe('−8 s');
    expect(sgnS(0)).toBe('±0 s');
    expect(sgnS(65)).toBe('+1:05');
  });

  it('regner klokke og kilometer', () => {
    expect(clockS('09:00', 5400)).toBe('10:30');
    expect(kmL(21.097)).toBe('21,1');
    expect(kmL(42.194)).toBe('42,2');
    expect(kmL(10)).toBe('10');
  });
});
