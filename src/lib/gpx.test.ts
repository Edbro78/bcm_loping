import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseGpx } from './gpx';

function lineGpx(km: number, n = 80): string {
  const dLat = km / 111.195;
  const pts = Array.from({ length: n }, (_, i) => {
    const lat = 60.39 + (dLat * i) / (n - 1);
    return `<trkpt lat="${lat.toFixed(6)}" lon="5.320000"><ele>10</ele></trkpt>`;
  });
  return `<?xml version="1.0"?><gpx><trk><trkseg>${pts.join('')}</trkseg></trk></gpx>`;
}

describe('gpx', () => {
  it('skalerer BCM-fila til 21,097 km og følger sporet', () => {
    const xml = readFileSync('public/data/bcm-course.gpx', 'utf8');
    const { points, error } = parseGpx(xml);
    expect(error).toBeNull();
    expect(points[points.length - 1].km).toBeCloseTo(21.097, 3);
    expect(points.length).toBeGreaterThan(2000);
    const maxLat = Math.max(...points.map((p) => p.lat));
    expect(maxLat).toBeGreaterThan(points[0].lat + 0.01);
    const step = points[100].km - points[99].km;
    expect(step).toBeCloseTo(0.01, 4);
  });

  it('avviser et 10 km-spor', () => {
    const { points, error } = parseGpx(lineGpx(10));
    expect(points).toHaveLength(0);
    expect(error).toMatch(/10,0 km/);
    expect(error).toMatch(/21,1 km/);
  });
});
