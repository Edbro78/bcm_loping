import { useMemo, useState } from 'react';
import { CalendarPlus, Copy, Download } from 'lucide-react';
import { ArmbandCard, ArmbandPrintButton } from './Splits';
import { HILLS } from '../config';
import {
  BCM_URL,
  buildFacebookPost,
  buildMilestoneIcs,
  buildPlanSummaryText,
  downloadTextFile,
  milestoneSummaries,
  formatTrainingBrief,
} from '../lib/summary';
import { clockDot, fmtP, fmtT } from '../lib/format';
import { useActivePlan } from '../state/active';
import { usePlan } from '../state/plan';

export function OppsummeringPage() {
  const { state } = usePlan();
  const { plan } = useActivePlan();
  const [copyMsg, setCopyMsg] = useState('');

  const milestones = useMemo(() => (plan ? milestoneSummaries(plan) : []), [plan]);
  const trainingBrief = useMemo(() => (plan ? formatTrainingBrief(plan) : ''), [plan]);
  const plainText = useMemo(() => (plan ? buildPlanSummaryText(plan, state) : ''), [plan, state]);
  const facebookText = useMemo(() => (plan ? buildFacebookPost(plan, state) : ''), [plan, state]);

  if (!plan) return <p className="intro">Laster oppsummering…</p>;

  const distLabel = state.dist === 'full' ? 'Maraton' : 'Halvmaraton';
  const hill = HILLS[state.hill];

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg(label);
      window.setTimeout(() => setCopyMsg(''), 2400);
    } catch {
      setCopyMsg('Kunne ikke kopiere – prøv last ned i stedet.');
    }
  }

  return (
    <section className="section oppsummering-section" id="oppsummering" aria-labelledby="oppsummering-tittel">
      <h2 id="oppsummering-tittel">Oppsummering</h2>
      <p className="intro">Kort oversikt over planen din – klar til å lagre, kopiere eller dele.</p>

      <div className="card oppsummering-lead">
        <dl className="oppsummering-dl">
          <div>
            <dt>Distanse</dt>
            <dd>{distLabel}</dd>
          </div>
          <div>
            <dt>Ønsket sluttid</dt>
            <dd>{fmtT(plan.input.T)}</dd>
          </div>
          <div>
            <dt>Snitt / flatfart</dt>
            <dd>
              {fmtP(plan.input.T / plan.D)}/km · p₀ {fmtP(plan.p0)}/km
            </dd>
          </div>
          <div>
            <dt>I mål (plan)</dt>
            <dd>kl. {clockDot(plan.input.start, plan.input.T)}</dd>
          </div>
        </dl>
      </div>

      <div className="card oppsummering-body">
        <h3>Strategi</h3>
        <ul className="oppsummering-list">
          <li>
            <strong>Split:</strong>{' '}
            {state.split === 'negativ' ? 'Negativ' : state.split === 'positiv' ? 'Positiv' : 'Jevn'}
            {state.split !== 'jevn' && ` (σ ${state.sigma.toFixed(1).replace('.', ',')} %)`}
          </li>
          <li>
            <strong>Bakker:</strong> {hill.l} – {hill.t}
          </li>
          <li>
            <strong>Drikke:</strong>{' '}
            {state.drink ? `${state.stopOn} s per stopp (${Math.round(plan.S)} s totalt)` : `Av (${Math.round(plan.S)} s modellert)`}
          </li>
          <li>
            <strong>Løype:</strong> Jevn innsats i bakkene – planen tåler at du ligger bak snittfart opp mot Fjellveien.
          </li>
        </ul>

        <h3>Treningsmilepæler</h3>
        <ul className="oppsummering-milestones">
          {milestones.map((m) => (
            <li key={m.title} className="oppsummering-milestone">
              <div>
                <strong>{m.title}</strong> · {m.dateLabel}
                <span className="help"> ({m.daysBefore} dager før løpet)</span>
                <p>
                  {m.distKm} km på {m.targetRange} ({m.paceHint})
                </p>
              </div>
              <button
                type="button"
                className="btn secondary oppsummering-ics"
                onClick={() => downloadTextFile(m.icsFilename, buildMilestoneIcs(m, plan), 'text/calendar;charset=utf-8')}
              >
                <CalendarPlus size={18} aria-hidden="true" />
                Kalender (.ics)
              </button>
            </li>
          ))}
        </ul>

        {trainingBrief && (
          <>
            <h3>Trening</h3>
            <div className="oppsummering-training-row">
              <p className="oppsummering-training">{trainingBrief}</p>
              <ArmbandPrintButton />
            </div>
          </>
        )}

        <h3>Armbåndskort</h3>
        <p className="help oppsummering-band-help">Mellomtid og klokkeslett ved kjente steder – skriv ut og fest på armen.</p>
        <div className="oppsummering-band-wrap">
          <ArmbandCard plan={plan} />
        </div>
        {!trainingBrief && <ArmbandPrintButton className="oppsummering-band-print--solo" />}
      </div>

      <div className="card oppsummering-export">
        <h3>Hele planen som tekst</h3>
        <p className="help">Om du vil lagre planen til senere.</p>
        <textarea className="oppsummering-text" readOnly value={plainText} aria-label="Oppsummering som tekst" rows={18} />
        <div className="oppsummering-actions">
          <button type="button" className="btn primary" onClick={() => copyText(plainText, 'Plan kopiert')}>
            <Copy size={18} aria-hidden="true" />
            Kopier plan
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => downloadTextFile('bcm-2027-min-plan.txt', plainText)}
          >
            <Download size={18} aria-hidden="true" />
            Last ned .txt
          </button>
        </div>
      </div>

      <div className="card oppsummering-export">
        <h3>Del på Facebook</h3>
        <p className="help">Kort versjon med overskrift og lenke til arrangøren.</p>
        <textarea className="oppsummering-text oppsummering-text--short" readOnly value={facebookText} rows={10} aria-label="Tekst for sosiale medier" />
        <div className="oppsummering-actions">
          <button type="button" className="btn primary" onClick={() => copyText(facebookText, 'Facebook-tekst kopiert')}>
            <Copy size={18} aria-hidden="true" />
            Kopier innlegg
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => downloadTextFile('bcm-2027-facebook.txt', facebookText)}
          >
            <Download size={18} aria-hidden="true" />
            Last ned .txt
          </button>
        </div>
        <p className="help">
          Offisiell side:{' '}
          <a href={BCM_URL} target="_blank" rel="noopener noreferrer">
            {BCM_URL.replace('https://', '')}
          </a>
        </p>
      </div>

      {copyMsg && (
        <p className="oppsummering-toast" role="status">
          {copyMsg}
        </p>
      )}
    </section>
  );
}
