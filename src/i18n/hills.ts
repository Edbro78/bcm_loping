import type { HillKey } from '../config';
import type { Locale } from '../state/previewLocale';

const HILL_COPY: Record<Locale, Record<HillKey, { l: string; t: string }>> = {
  nb: {
    fort: { l: 'Fort', t: 'Presser motbakkene og slipper seg ned. Høyere puls, mer risiko.' },
    middels: { l: 'Middels', t: 'Konstant innsats, dvs. jevn GAP. Tregere opp, raskere ned.' },
    sakte: { l: 'Sakte', t: 'Sparer motbakkene og skåner lårene nedover. Tiden hentes inn på flatene.' },
  },
  en: {
    fort: { l: 'Hard', t: 'Push the climbs and let go on the descents. Higher heart rate, more risk.' },
    middels: { l: 'Moderate', t: 'Steady effort, i.e. even GAP. Slower up, faster down.' },
    sakte: { l: 'Easy', t: 'Save the climbs and spare your quads downhill. Time is banked on the flats.' },
  },
};

export function hillCopy(locale: Locale, key: HillKey) {
  return HILL_COPY[locale][key];
}
