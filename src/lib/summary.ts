import { HILLS, type HillKey, type SplitKey } from '../config';
import type { Plan } from './model';
import { clockDot, dateDM, fmtP, fmtT } from './format';
import { addDays, lookupMilestones, rngT, WEEK1 } from './milestones';
import type { PlanState } from '../state/plan';

const RACE = new Date(Date.UTC(2027, 3, 24));
const BCM_URL = 'https://www.bergencitymarathon.com';
function guideUrl(): string {
  if (typeof location === 'undefined') return '';
  return location.origin + location.pathname;
}

const TAPER_FROM_WEEK = 12;

export function trainingVolumeBrief(plan: Plan) {
  const hit = lookupMilestones(plan.input.full, plan.input.T);
  return {
    volRange: hit.vol,
    taperFromWeek: TAPER_FROM_WEEK,
    taperFromDate: dateDM(addDays(WEEK1, (TAPER_FROM_WEEK - 1) * 7)),
  };
}

export function formatTrainingBrief(plan: Plan): string {
  const { volRange, taperFromWeek, taperFromDate } = trainingVolumeBrief(plan);
  return `Sikt mot ${volRange[0]}–${volRange[1]} km per uke de siste tre månedene. Nedtrapping fra uke ${taperFromWeek} (mandagsuken som starter ${taperFromDate}).`;
}

const MILESTONE_TESTS = [
  { week: 4, title: 'Milepæl 1', key: 'k3' as const, dist: 3, kmLabel: '3 km' },
  { week: 8, title: 'Milepæl 2', key: 'k5' as const, dist: 5, kmLabel: '5 km' },
  { week: 10, title: 'Milepæl 3', key: 'k10' as const, dist: 10, kmLabel: '10 km' },
];

function splitLabel(split: SplitKey, sigma: number): string {
  if (split === 'jevn') return 'Jevn split (lik innsats første og andre halvdel).';
  const name = split === 'negativ' ? 'Negativ split' : 'Positiv split';
  return `${name} (σ ${sigma.toFixed(1).replace('.', ',')} %).`;
}

function milestoneDay(week: number): Date {
  return addDays(WEEK1, (week - 1) * 7 + 5);
}

export type MilestoneSummary = {
  title: string;
  date: Date;
  dateLabel: string;
  daysBefore: number;
  distKm: number;
  targetRange: string;
  paceHint: string;
  icsFilename: string;
};

export function milestoneSummaries(plan: Plan): MilestoneSummary[] {
  const hit = lookupMilestones(plan.input.full, plan.input.T);
  return MILESTONE_TESTS.map((t) => {
    const rng = hit[t.key];
    const date = milestoneDay(t.week);
    const daysBefore = Math.round((RACE.getTime() - date.getTime()) / 86400000);
    return {
      title: t.title,
      date,
      dateLabel: dateDM(date),
      daysBefore,
      distKm: t.dist,
      targetRange: rngT(rng[0], rng[1]),
      paceHint: `${fmtP(rng[1] / t.dist)}/km eller raskere`,
      icsFilename: `bcm-2027-${t.kmLabel.replace(' ', '')}-test.ics`,
    };
  });
}

export function buildPlanSummaryText(plan: Plan, state: PlanState): string {
  const full = plan.input.full;
  const dist = full ? 'Maraton' : 'Halvmaraton';
  const distKm = full ? '42,2 km' : '21,1 km';
  const goal = fmtT(plan.input.T);
  const start = plan.input.start;
  const raceStart = full ? '07.45' : '09.00';
  const hit = lookupMilestones(full, plan.input.T);
  const milestones = milestoneSummaries(plan);

  const lines: string[] = [
    'BCM 2027 – min løpeplan',
    '========================',
    '',
    `Distanse: ${dist} (${distKm})`,
    `Ønsket sluttid: ${goal}`,
    `Start Bryggen: ${raceStart} (lørdag 24. april 2027)`,
    `Planlagt i mål: ca. kl. ${clockDot(start, plan.input.T)}`,
    '',
    'Tempo og strategi',
    '-----------------',
    `Snittfart (flat): ${fmtP(plan.input.T / plan.D)}/km`,
    `Flatfart p₀: ${fmtP(plan.p0)}/km`,
    splitLabel(state.split, state.sigma),
    `Bakkestrategi: ${HILLS[state.hill as HillKey].l} – ${HILLS[state.hill as HillKey].t}`,
    state.drink
      ? `Drikkestopp: ${state.stopOn} s per stasjon (${Math.round(plan.S)} s totalt).`
      : `Drikkestopp: av (modellen legger ${Math.round(plan.S)} s totalt).`,
    '',
    'Løpeplan i korte trekk',
    '----------------------',
    'Planen følger jevn innsats i bakkene – du skal ligge bak jevn snittfart opp mot Fjellveien, ikke jage klokka der.',
    `Halvveis: ${fmtT(plan.tAt(plan.D / 2))} · I mål: ${goal}.`,
    '',
    'Anbefalte testmilepæler (siste 90 dager)',
    '----------------------------------------',
    `VDOT ≈ ${hit.vdot.toFixed(1).replace('.', ',')}`,
  ];

  for (const m of milestones) {
    lines.push(
      '',
      `${m.title} – ${m.dateLabel} (${m.daysBefore} dager før løpet)`,
      `${m.distKm} km på ${m.targetRange} (${m.paceHint})`,
    );
  }

  lines.push('', 'Trening', '-------', formatTrainingBrief(plan));

  lines.push(
    '',
    'Offisiell info og påmelding:',
    BCM_URL,
    '',
    'Generert med BCM løpeguide.',
  );
  const gu = guideUrl();
  if (gu) lines.push(gu);

  return lines.join('\n');
}

export function buildFacebookPost(plan: Plan, state: PlanState): string {
  const dist = plan.input.full ? 'maraton' : 'halvmaraton';
  const goal = fmtT(plan.input.T);
  const milestones = milestoneSummaries(plan);
  const mLines = milestones.map((m) => `• ${m.dateLabel}: ${m.distKm} km-test (${m.targetRange})`).join('\n');
  const { volRange, taperFromWeek, taperFromDate } = trainingVolumeBrief(plan);

  return [
    'Min plan for BCM i 2027!',
    '',
    `${dist.charAt(0).toUpperCase() + dist.slice(1)} på ${goal}.`,
    `${HILLS[state.hill as HillKey].l} i bakkene, ${state.split === 'jevn' ? 'jevn split' : state.split + ' split'}.`,
    `Flatfart ca. ${fmtP(plan.p0)}/km.`,
    `Trening ca. ${volRange[0]}–${volRange[1]} km/uke · nedtrapping fra uke ${taperFromWeek} (${taperFromDate}).`,
    '',
    'Testmilepæler:',
    mLines,
    '',
    `Offisiell side: ${BCM_URL}`,
  ].join('\n');
}

/** CET/CEST: enkel offset for milepæler (feb–apr 2027). */
function localToUtcIcs(d: Date, hour: number, minute: number): string {
  const y = d.getUTCFullYear();
  const mo = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const month = d.getUTCMonth();
  const dst = month >= 2 && month <= 9;
  const offset = dst ? 2 : 1;
  let uh = hour - offset;
  let ud = day;
  if (uh < 0) {
    uh += 24;
    ud -= 1;
  }
  return `${y}${String(mo).padStart(2, '0')}${String(ud).padStart(2, '0')}T${String(uh).padStart(2, '0')}${String(minute).padStart(2, '0')}00Z`;
}

export function buildMilestoneIcs(m: MilestoneSummary, plan: Plan): string {
  const start = localToUtcIcs(m.date, 9, 0);
  const end = localToUtcIcs(m.date, 10, 0);
  const dist = plan.input.full ? 'maraton' : 'halvmaraton';
  const desc = [
    `BCM 2027 – ${m.title}`,
    `Mål: ${fmtT(plan.input.T)} (${dist})`,
    `Test: ${m.distKm} km på ${m.targetRange} (${m.paceHint})`,
    BCM_URL,
  ].join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BCM Lopeguide//NO',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:bcm27-${m.dateLabel}-${m.distKm}km@lopeguide`,
    `DTSTAMP:${localToUtcIcs(new Date(), 12, 0)}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:BCM test ${m.distKm} km (${m.targetRange})`,
    `DESCRIPTION:${desc}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export { BCM_URL };
