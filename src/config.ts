/** Alle faste tall for BCM 2027. Bytt GPX-filen uten å endre kode. */

export const LAP = 21.097;

/** Vite legger public/ på roten. index.html (fil eller Live Server) bruker mappen public/. */
export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  const vite =
    typeof window !== 'undefined' &&
    Boolean((window as Window & { __BCM_VITE__?: boolean }).__BCM_VITE__);
  if (vite) return `/${clean}`;
  if (typeof location === 'undefined') return `/${clean}`;
  const href = location.href.split('#')[0].split('?')[0];
  const dir = href.slice(0, href.lastIndexOf('/') + 1);
  return `${dir}public/${clean}`;
}

export const GPX_URL = publicUrl('data/bcm-course.gpx');

export const CFG = {
  up: [0.033, 0.0012] as const,
  dn: [0.018, 0.001] as const,
  clip: 20,
  seg: 0.1,
  smoothSamples: 2,
  cobble: [17.8, 18.4] as const,
  cobbleU: 1.03,
  thr: 2,
};

export const HILLS = {
  fort: { up: 0.95, dn: 0.97, l: 'Fort', t: 'Presser motbakkene og slipper seg ned. Høyere puls, mer risiko.' },
  middels: { up: 1, dn: 1, l: 'Middels', t: 'Konstant innsats, dvs. jevn GAP. Tregere opp, raskere ned.' },
  sakte: { up: 1.06, dn: 1.02, l: 'Sakte', t: 'Sparer motbakkene og skåner lårene nedover. Tiden hentes inn på flatene.' },
} as const;

export type HillKey = keyof typeof HILLS;
export type SplitKey = 'negativ' | 'jevn' | 'positiv';
export type DistKey = 'half' | 'full';

export const STATIONS = [3.5, 7.2, 10, 14, 19];
export const FULL_EXTRA_STATION = LAP + 0.403;
export const RACE_START = { half: '2027-04-24T09:00:00+02:00', full: '2027-04-24T07:45:00+02:00' };
export const DEFAULT_START = { half: '09:00', full: '07:45' };
export const CUTOFF_FULL = '10:45';
export const MAX_TIME = { half: 4 * 3600, full: 6 * 3600 };
export const QUICK = {
  half: [4800, 5400, 6000, 6300, 6600, 7200, 8100],
  full: [9900, 10800, 11700, 12600, 13500, 14400, 16200],
};

export const TB = { s: 60.366, n: 60.428, w: 5.29, e: 5.38 };
export const TW = { s: 60.3, n: 60.5, w: 5.1, e: 5.56 };

export type PoiType = 'start' | 'info' | 'drink' | 'toilet' | 'relay' | 'steep' | 'cobble';

export type Poi = {
  n: string;
  /** Km i runden. null = utenfor løypa. Bryggen-drikke snappes til 0,403. */
  km: number | null;
  lat: number;
  lng: number;
  t: PoiType[];
  d?: string;
  approx?: boolean;
  relay?: number;
  fullOnly?: boolean;
  /** Visnings-km når det skiller seg fra snap-km (Bryggen 21,5). */
  showKm?: number;
};

export const POIS: Poi[] = [
  { n: 'Start og mål Bryggen', km: 0, lat: 60.39757, lng: 5.32455, t: ['start'] },
  { n: 'Festningskaien', km: 0.5, lat: 60.3999, lng: 5.31646, t: ['info'], d: 'Tøyoppbevaring, trasé ut' },
  { n: 'Gamle Bergen (Elsesro)', km: 3.2, lat: 60.41816, lng: 5.30932, t: ['relay'], relay: 1 },
  { n: 'Sandviken sykehus', km: 3.5, lat: 60.41851, lng: 5.31397, t: ['drink'] },
  { n: 'Nyhavnsveien', km: 3.8, lat: 60.4168, lng: 5.3172, t: ['steep'], d: 'Bratt klatring med svinger', approx: true },
  { n: 'BKK i Fjellveien', km: 4.6, lat: 60.4125, lng: 5.324, t: ['relay'], relay: 2, approx: true },
  { n: 'Fjellveien v/ «Hesten trenger hvile»', km: 5, lat: 60.4098, lng: 5.3262, t: ['toilet'], approx: true },
  { n: 'Mon Plaisir', km: 5.6, lat: 60.4065, lng: 5.3285, t: ['relay'], relay: 3, approx: true },
  { n: 'Fjellveien v/ Tippetue', km: 7.2, lat: 60.39761, lng: 5.33292, t: ['drink'], approx: true },
  { n: 'Slutten av Fjellveien / Bellevuebakken', km: 8.2, lat: 60.38541, lng: 5.35355, t: ['relay'], relay: 4, d: 'Ca. høyeste punkt' },
  { n: 'Svartediket', km: 9.3, lat: 60.386, lng: 5.36673, t: ['relay', 'toilet'], relay: 5 },
  { n: 'Haraldsplass sykehus', km: 10, lat: 60.37913, lng: 5.36287, t: ['drink'] },
  { n: 'Starten av Møllendalsveien', km: 11.2, lat: 60.3727, lng: 5.3512, t: ['toilet'], approx: true },
  { n: 'Grønneviksøren / helikopterplassen', km: 12.3, lat: 60.3775, lng: 5.3395, t: ['relay'], relay: 6, approx: true },
  { n: 'AdO arena', km: 14, lat: 60.38563, lng: 5.33776, t: ['drink'] },
  { n: 'Møhlenpris idrettsplass', km: 15.8, lat: 60.383, lng: 5.32631, t: ['relay', 'toilet'], relay: 7, d: '5 km-start' },
  { n: 'Hurtigruteterminalen', km: 17.8, lat: 60.39226, lng: 5.31062, t: ['relay'], relay: 8 },
  { n: 'Munkebekksmauet', km: 18, lat: 60.39451, lng: 5.31425, t: ['cobble'], d: 'Kort, svært bratt brostein' },
  { n: 'Nordnes skole', km: 19, lat: 60.39723, lng: 5.30803, t: ['drink'] },
  { n: 'Nordnesparken', km: 19.2, lat: 60.39843, lng: 5.30417, t: ['relay', 'toilet'], relay: 9 },
  { n: 'Bryggen (kun maraton)', km: 0.403, lat: 60.39835, lng: 5.3212, t: ['drink'], fullOnly: true, showKm: 21.5 },
  { n: 'Vikinghallen', km: null, lat: 60.39932, lng: 5.32192, t: ['info'], d: 'Expo og garderobe' },
];

export const CP: [number, string][] = [
  [3.2, 'Gamle Bergen'],
  [3.5, 'Drikke Sandviken'],
  [4.6, 'BKK Fjellveien'],
  [5.6, 'Mon Plaisir'],
  [7.2, 'Drikke Tippetue'],
  [8.2, 'Slutten av Fjellveien (topp)'],
  [9.3, 'Svartediket'],
  [10, 'Drikke Haraldsplass'],
  [12.3, 'Grønneviksøren'],
  [14, 'Drikke AdO'],
  [15.8, 'Møhlenpris'],
  [17.8, 'Hurtigruteterminalen'],
  [18.4, 'Toppen av Munkebekksmauet'],
  [19, 'Drikke Nordnes skole'],
  [19.2, 'Nordnesparken'],
  [21.097, 'Mål'],
];

export type TerrKey = 'climb' | 'flat' | 'down' | 'cobble';

export type Stage = {
  km: string;
  name: string;
  profile: string;
  surface: string;
  tactic: string;
  from: number;
  to: number;
  terr: TerrKey;
};

export const STAGES: Stage[] = [
  ['0–3,2', 'Bryggen–Bradbenken–Sandviken–Gamle Bergen', 'Flatt langs sjøen', 'Asfalt', 'Start behersket', 0, 3.2, 'flat'],
  ['3,2–4,6', 'Gamle Bergen–Fjellveien', 'Bratt klatring med svinger (Nyhavnsveien, nedenfor psykiatrisk klinikk)', 'Asfalt', 'Hold flatpulsen, ikke tempoet', 3.2, 4.6, 'climb'],
  ['4,6–8,2', 'Fjellveien', 'Stigende og kupert, høyeste punkt mot slutten', 'Asfalt, føles stiaktig', 'Nyt utsikten over byen', 4.6, 8.2, 'climb'],
  ['8,2–9,3', 'Bellevuebakken–Svartediket', 'Bratt ned', 'Asfalt', 'Ikke press, det skåner lårene', 8.2, 9.3, 'down'],
  ['9,3–12,3', 'Bjørndalen–Haraldsplass–Haukeland–Møllendal', 'Nedover med én kort bakke ved kirkegården', 'Asfalt', 'Finn rytmen', 9.3, 12.3, 'down'],
  ['12,3–15,8', 'Store Lungegårdsvann–AdO–Møhlenpris', 'Flatt, vindutsatt', 'Asfalt/gangvei', 'Hold tempo, søk ly i grupper', 12.3, 15.8, 'flat'],
  ['15,8–17,8', 'Havneområdet', 'Flatt, lite publikum', 'Asfalt', 'Mentalt tungt parti', 15.8, 17.8, 'flat'],
  ['17,8–19,2', 'Munkebekksmauet–Nordnes–Nordnesparken', 'Kort, svært bratt brostein, så slakt nedover', 'Brostein/asfalt', 'Korte steg, gå gjerne', 17.8, 19.2, 'cobble'],
  ['19,2–21,1', 'Strandgaten–Torget–Bryggen', 'Lang nedoverbakke, så flatt', 'Asfalt', 'Sluttspurt', 19.2, 21.097, 'down'],
].map(([km, name, profile, surface, tactic, from, to, terr]) => ({
  km: km as string,
  name: name as string,
  profile: profile as string,
  surface: surface as string,
  tactic: tactic as string,
  from: from as number,
  to: to as number,
  terr: terr as TerrKey,
}));

export const TERR: Record<TerrKey, { bg: string; chipBg: string; chipFg: string; l: string }> = {
  climb: { bg: '#FDF6F5', chipBg: '#F6DEDB', chipFg: '#8E2520', l: 'Klatring' },
  flat: { bg: '#FFFFFF', chipBg: '#E9EEF0', chipFg: '#12304A', l: 'Flatt' },
  down: { bg: '#F4F7F9', chipBg: '#D5DFE7', chipFg: '#12304A', l: 'Nedover' },
  cobble: { bg: '#FBF8F1', chipBg: '#FBEFD6', chipFg: '#9A6A12', l: 'Brostein' },
};

/** Målfart mot flatfart. Fargene er fra BCM-paletten og skilles også med tekst i legenden. */
export const PACE_SCALE = [
  { max: 0.97, c: '#3D6A4E', l: 'Raskere' },
  { max: 1.03, c: '#12304A', l: 'Som flatfart' },
  { max: 1.12, c: '#9A6A12', l: 'Litt tregere' },
  { max: Infinity, c: '#B3322A', l: 'Mye tregere' },
];

export function paceColor(r: number): string {
  return PACE_SCALE.find((s) => r <= s.max)?.c ?? PACE_SCALE[PACE_SCALE.length - 1].c;
}

/** Reserveprofil [km, moh], brukes bare når GPX mangler høyde. */
export const RESERVE: [number, number][] = [
  [0, 5], [0.5, 5], [1, 8], [1.5, 5], [2, 6], [2.5, 12], [3, 8], [3.2, 12],
  [4, 60], [4.6, 80], [5, 88], [5.6, 95], [6, 105], [6.4, 98], [7, 112], [7.4, 104],
  [8, 124], [8.2, 125], [9, 85], [9.3, 80], [10, 60], [10.6, 52], [11, 58], [11.5, 45],
  [12, 12], [12.3, 5], [13, 3], [14, 3], [15, 3], [15.4, 10], [15.8, 4], [16, 8],
  [16.5, 15], [17, 5], [17.8, 4], [18, 22], [18.4, 28], [19, 30], [19.2, 28],
  [19.6, 20], [19.9, 26], [20, 12], [21, 5], [21.097, 5],
];

export const BAND_HALF: [number, string][] = [
  [3.2, 'Gamle Bergen'],
  [5, '5 km'],
  [8.2, 'Topp Fjellveien'],
  [10, '10 km'],
  [12.3, 'Grønneviksøren'],
  [15, '15 km'],
  [17.8, 'Hurtigruten'],
  [19.2, 'Nordnesparken'],
  [21.097, 'Mål'],
];

export const BAND_FULL: [number, string][] = [
  [5, '5 km'],
  [8.2, 'Topp Fjellveien'],
  [10, '10 km'],
  [15, '15 km'],
  [21.097, 'Halvveis'],
  [25, '25 km'],
  [29.297, 'Topp Fjellv. R2'],
  [30, '30 km'],
  [35, '35 km'],
  [40, '40 km'],
  [42.194, 'Mål'],
];

export const REF_HALF = [4800, 5400, 6000, 6300, 6600, 7200, 8100];
export const REF_FULL = [9900, 10800, 11700, 12600, 13500, 14400, 16200];
export const REF_COLS_HALF = [3.2, 5, 8.2, 10, 12.3, 15, 17.8, 19.2, 20, LAP];
export const REF_COLS_FULL = [5, 8.2, 10, 15, LAP, 25, 29.3, 30, 35, 40, LAP * 2];

export const PROGRAM: { t: string; ev: string; hl?: 'half' | 'full' | 'bad' }[] = [
  { t: '06.30', ev: 'Garderobe åpner i Vikinghallen' },
  { t: '07.00', ev: 'Tøyoppbevaring åpner ved Festningskaien' },
  { t: '07.45', ev: 'Start maraton', hl: 'full' },
  { t: '09.00–10.00', ev: 'Start halvmaraton i puljer etter målsluttid', hl: 'half' },
  { t: '10.45', ev: 'Cut-off for maraton på Bryggen', hl: 'bad' },
  { t: '11.15', ev: 'Start stafett' },
  { t: '12.15', ev: 'Start 5 km' },
  { t: '15.00', ev: 'Tøyoppbevaring stenger' },
];

export const TYPE_LABEL: Record<PoiType, string> = {
  start: 'Start',
  info: 'Info',
  drink: 'Drikke',
  toilet: 'Toalett',
  relay: 'Stafett',
  steep: 'Bratt',
  cobble: 'Brostein',
};
