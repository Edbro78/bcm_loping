import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import bundledGpx from '../../public/data/bcm-course.gpx?raw';
import { GPX_URL } from '../config';
import { approximateCourse, parseGpx, type Pt } from '../lib/gpx';

const KEY = 'bcm27-gpx-v1';

export type CourseStatus = 'loading' | 'ok' | 'estimated';

type CourseApi = {
  status: CourseStatus;
  points: Pt[];
  name: string;
  error: string | null;
  custom: boolean;
  loadFile: (file: File) => Promise<void>;
  clearCustom: () => void;
};

const Ctx = createContext<CourseApi | null>(null);

function pointsToGpx(pts: Pt[]): string {
  const body = pts
    .map((p) => `<trkpt lat="${p.lat}" lon="${p.lng}"><ele>${p.ele}</ele></trkpt>`)
    .join('');
  return `<gpx><trk><trkseg>${body}</trkseg></trk></gpx>`;
}

function readText(url: string): Promise<string> {
  if (location.protocol === 'file:') {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) resolve(xhr.responseText);
        else reject(new Error(String(xhr.status)));
      };
      xhr.onerror = () => reject(new Error('nettverk'));
      xhr.send();
    });
  }
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(String(res.status));
    return res.text();
  });
}

async function readDefault(): Promise<{ points: Pt[]; error: string | null }> {
  try {
    const parsed = parseGpx(await readText(GPX_URL));
    if (!parsed.error && parsed.points.length >= 50) return parsed;
  } catch {
    /* Chrome tillater ikke å lese lokale filer fra en åpnet HTML-fil. */
  }
  if (location.protocol === 'file:') return parseGpx(bundledGpx);
  return { points: [], error: 'Fant ikke nok sporpunkter i filen.' };
}

export function CourseProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<CourseStatus>('loading');
  const [points, setPoints] = useState<Pt[]>([]);
  const [name, setName] = useState('bcm-course.gpx');
  const [error, setError] = useState<string | null>(null);
  const [custom, setCustom] = useState(false);

  function applyTrack(res: { points: Pt[]; error: string | null }, fileName: string, isCustom: boolean) {
    if (res.error || res.points.length < 50) {
      setError(res.error ?? 'Fant ikke nok sporpunkter i filen.');
      setPoints(approximateCourse());
      setStatus('estimated');
    } else {
      setError(null);
      setPoints(res.points);
      setStatus('ok');
    }
    setName(fileName);
    setCustom(isCustom);
  }

  async function loadDefault() {
    const res = await readDefault();
    applyTrack(res, 'bcm-course.gpx', false);
  }

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as { name?: string; points?: Pt[] };
        if (saved.points && saved.points.length >= 50) {
          const res = parseGpx(pointsToGpx(saved.points));
          if (!res.error) {
            applyTrack(res, saved.name || 'egen.gpx', true);
            return;
          }
        }
      } catch {
        /* standardfil */
      }
    }
    void loadDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadFile(file: File) {
    const res = parseGpx(await file.text());
    if (res.error || !res.points.length) {
      setError(res.error ?? 'Fant ikke nok sporpunkter i filen.');
      setPoints(approximateCourse());
      setStatus('estimated');
      setName(file.name);
      return;
    }
    const slim = res.points.filter((_, i) => i % 2 === 0).map((p) => ({
      km: Number(p.km.toFixed(3)),
      lat: Number(p.lat.toFixed(6)),
      lng: Number(p.lng.toFixed(6)),
      ele: Number(p.ele.toFixed(1)),
    }));
    localStorage.setItem(KEY, JSON.stringify({ name: file.name, points: slim }));
    setError(null);
    setPoints(res.points);
    setStatus('ok');
    setName(file.name);
    setCustom(true);
  }

  function clearCustom() {
    localStorage.removeItem(KEY);
    setStatus('loading');
    void loadDefault();
  }

  return (
    <Ctx.Provider value={{ status, points, name, error, custom, loadFile, clearCustom }}>{children}</Ctx.Provider>
  );
}

export function useCourse(): CourseApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('CourseProvider mangler');
  return ctx;
}
