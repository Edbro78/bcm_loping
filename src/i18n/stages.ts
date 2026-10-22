import { STAGES, type Stage } from '../config';
import type { Locale } from '../state/previewLocale';

type StageText = Pick<Stage, 'km' | 'name' | 'profile' | 'surface' | 'tactic'>;

const NB: StageText[] = [
  {
    km: '0–3,2',
    name: 'Bryggen–Bradbenken–Sandviken–Gamle Bergen',
    profile: 'Flatt langs sjøen',
    surface: 'Asfalt',
    tactic: 'Start behersket',
  },
  {
    km: '3,2–4,6',
    name: 'Gamle Bergen–Fjellveien',
    profile: 'Bratt klatring med svinger (Nyhavnsveien, nedenfor psykiatrisk klinikk)',
    surface: 'Asfalt',
    tactic: 'Hold flatpulsen, ikke tempoet',
  },
  {
    km: '4,6–8,2',
    name: 'Fjellveien',
    profile: 'Stigende og kupert, høyeste punkt mot slutten',
    surface: 'Asfalt, føles stiaktig',
    tactic: 'Nyt utsikten over byen',
  },
  {
    km: '8,2–9,3',
    name: 'Bellevuebakken–Svartediket',
    profile: 'Bratt ned',
    surface: 'Asfalt',
    tactic: 'Ikke press, det skåner lårene',
  },
  {
    km: '9,3–12,3',
    name: 'Bjørndalen–Haraldsplass–Haukeland–Møllendal',
    profile: 'Nedover med én kort bakke ved kirkegården',
    surface: 'Asfalt',
    tactic: 'Finn rytmen',
  },
  {
    km: '12,3–15,8',
    name: 'Store Lungegårdsvann–AdO–Møhlenpris',
    profile: 'Flatt, vindutsatt',
    surface: 'Asfalt/gangvei',
    tactic: 'Hold tempo, søk ly i grupper',
  },
  {
    km: '15,8–17,8',
    name: 'Havneområdet',
    profile: 'Flatt, lite publikum',
    surface: 'Asfalt',
    tactic: 'Mentalt tungt parti',
  },
  {
    km: '17,8–19,2',
    name: 'Munkebekksmauet–Nordnes–Nordnesparken',
    profile: 'Kort, svært bratt brostein, så slakt nedover',
    surface: 'Brostein/asfalt',
    tactic: 'Korte steg, gå gjerne',
  },
  {
    km: '19,2–21,1',
    name: 'Strandgaten–Torget–Bryggen',
    profile: 'Lang nedoverbakke, så flatt',
    surface: 'Asfalt',
    tactic: 'Sluttspurt',
  },
];

const EN: StageText[] = [
  {
    km: '0–3.2',
    name: 'Bryggen–Bradbenken–Sandviken–Gamle Bergen',
    profile: 'Flat along the waterfront',
    surface: 'Asphalt',
    tactic: 'Start controlled',
  },
  {
    km: '3.2–4.6',
    name: 'Gamle Bergen–Fjellveien',
    profile: 'Steep climb with switchbacks (Nyhavnsveien, below the psychiatric clinic)',
    surface: 'Asphalt',
    tactic: 'Hold flat-ground effort, not pace',
  },
  {
    km: '4.6–8.2',
    name: 'Fjellveien',
    profile: 'Rolling climb, high point near the end',
    surface: 'Asphalt, trail-like feel',
    tactic: 'Enjoy the city views',
  },
  {
    km: '8.2–9.3',
    name: 'Bellevuebakken–Svartediket',
    profile: 'Steep descent',
    surface: 'Asphalt',
    tactic: 'Do not hammer it—spare your quads',
  },
  {
    km: '9.3–12.3',
    name: 'Bjørndalen–Haraldsplass–Haukeland–Møllendal',
    profile: 'Downhill with one short rise at the cemetery',
    surface: 'Asphalt',
    tactic: 'Find your rhythm',
  },
  {
    km: '12.3–15.8',
    name: 'Store Lungegårdsvann–AdO–Møhlenpris',
    profile: 'Flat, exposed to wind',
    surface: 'Asphalt/path',
    tactic: 'Hold pace, tuck in behind others',
  },
  {
    km: '15.8–17.8',
    name: 'Harbour area',
    profile: 'Flat, few spectators',
    surface: 'Asphalt',
    tactic: 'Mentally tough stretch',
  },
  {
    km: '17.8–19.2',
    name: 'Munkebekksmauet–Nordnes–Nordnesparken',
    profile: 'Short, very steep cobbles, then gentle downhill',
    surface: 'Cobbles/asphalt',
    tactic: 'Short steps, walk if you need to',
  },
  {
    km: '19.2–21.1',
    name: 'Strandgaten–Torget–Bryggen',
    profile: 'Long downhill, then flat',
    surface: 'Asphalt',
    tactic: 'Finish strong',
  },
];

const COPY: Record<Locale, StageText[]> = { nb: NB, en: EN };

export function localizedStages(locale: Locale): Stage[] {
  const text = COPY[locale];
  return STAGES.map((s, i) => ({ ...s, ...text[i]! }));
}
