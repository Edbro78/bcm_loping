import { useEffect, useState } from 'react';
import { Clock, Droplet, Flag, Gauge, Info, type LucideIcon } from 'lucide-react';
import { HILLS, MAX_TIME, QUICK } from '../config';
import type { HillKey, SplitKey } from '../config';
import { clockDot, fmtP, fmtT, parseT, quickLabel, sgnS } from '../lib/format';
import { useActivePlan } from '../state/active';
import { StepContinue } from './StepContinue';
import { useUi } from '../i18n/useUi';
import { scrollToView, usePlan } from '../state/plan';

const TIME_RANGE = {
  half: { min: 60 * 60, max: MAX_TIME.half },
  full: { min: 2 * 3600, max: MAX_TIME.full },
} as const;

function TimeSlider({
  dist,
  seconds,
  onChange,
}: {
  dist: 'half' | 'full';
  seconds: number;
  onChange: (sec: number) => void;
}) {
  const { min, max } = TIME_RANGE[dist];
  const minM = min / 60;
  const maxM = max / 60;
  const value = Math.min(maxM, Math.max(minM, Math.round(seconds / 60)));
  return (
    <label className="slider">
      <span>Sluttid {fmtT(value * 60)}</span>
      <input
        type="range"
        min={minM}
        max={maxM}
        step={1}
        value={value}
        aria-label="Sluttid"
        aria-valuemin={minM}
        aria-valuemax={maxM}
        aria-valuenow={value}
        aria-valuetext={fmtT(value * 60)}
        onChange={(e) => onChange(Number(e.target.value) * 60)}
      />
      <span className="time-ends">
        <span>{fmtT(min)}</span>
        <span>{fmtT(max)}</span>
      </span>
    </label>
  );
}

export function TempoPlan() {
  const { state, patch } = usePlan();
  const { plan } = useActivePlan();
  const T = state.dist === 'full' ? state.targetFull : state.targetHalf;
  const [focus, setFocus] = useState(false);
  const [draft, setDraft] = useState(fmtT(T));
  const [bad, setBad] = useState(false);
  useEffect(() => {
    if (!focus) setDraft(fmtT(T));
  }, [T, focus, state.dist]);

  const m = useUi();
  if (!plan) return <p className="intro">{m.tempoPlan.loading}</p>;

  const quick = QUICK[state.dist];
  const t5 = plan.tAt(5);
  const even5 = 5 * (plan.input.T / plan.D);
  const diff = t5 - even5;
  const behind =
    Math.abs(diff) < 0.5 ? 'på jevn snittfart' : `${diff > 0 ? sgnS(diff).replace('+', '') : sgnS(diff).replace('−', '')} ${diff > 0 ? 'bak' : 'foran'} jevn snittfart`;
  const halfT = plan.tAt(plan.D / 2);
  const nStops = plan.stations.length;

  function setTarget(sec: number) {
    setBad(false);
    setDraft(fmtT(sec));
    patch(state.dist === 'full' ? { targetFull: sec } : { targetHalf: sec });
  }

  function goToLopeplan() {
    patch({ view: 'splits' });
    scrollToView('splits');
  }

  return (
    <section className="section tempo-section" aria-labelledby="tempo-tittel">
      <h2 id="tempo-tittel">{m.tempoPlan.h2}</h2>
      <p className="intro tempo-intro">
        Jevn innsats i bakkene – alt oppdateres mens du endrer, og lagres på enheten.
      </p>
      <div className="split-2 tempo-split-2">
        <div className="card tempo-form-card">
          <div className="tempo-form-top">
            <label className="lbl" htmlFor="maal">
              Mål-sluttid
            </label>
            <div className="target-row">
              <input
                id="maal"
                className={`target ${bad ? 'bad' : ''}`}
                inputMode="numeric"
                aria-invalid={bad}
                value={focus ? draft : fmtT(T)}
                onFocus={() => {
                  setFocus(true);
                  setDraft(fmtT(T));
                }}
                onBlur={() => {
                  setFocus(false);
                  const p = parseT(draft);
                  if (p == null || p <= 0) setBad(true);
                  else setTarget(p);
                }}
                onChange={(e) => {
                  setDraft(e.target.value);
                  const p = parseT(e.target.value);
                  setBad(p == null);
                  if (p != null && p > 0) patch(state.dist === 'full' ? { targetFull: p } : { targetHalf: p });
                }}
              />
              <span className="hint">{fmtP(T / plan.D)}/km i snitt</span>
            </div>
            <div className="pills" role="group" aria-label="Hurtigvalg">
              {quick.map((s) => (
                <button key={s} type="button" className={`pill ${T === s ? 'on' : ''}`} onClick={() => setTarget(s)}>
                  {quickLabel(s)}
                </button>
              ))}
            </div>
            <TimeSlider dist={state.dist} seconds={T} onChange={setTarget} />
          </div>

          <div className="tempo-form-mid">
            <div className="tempo-form-cell">
              <p className="lbl">Split-strategi</p>
              <div className="seg" role="group" aria-label="Split-strategi">
                {(['negativ', 'jevn', 'positiv'] as SplitKey[]).map((k) => (
                  <button key={k} type="button" aria-pressed={state.split === k} onClick={() => patch({ split: k })}>
                    {k === 'negativ' ? 'Negativ' : k === 'jevn' ? 'Jevn' : 'Positiv'}
                  </button>
                ))}
              </div>
              <label className={`slider ${state.split === 'jevn' ? 'off' : ''}`}>
                <span>Split σ {state.sigma.toFixed(1).replace('.', ',')} %</span>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={state.sigma}
                  disabled={state.split === 'jevn'}
                  onChange={(e) => patch({ sigma: Number(e.target.value) })}
                />
              </label>
            </div>
            <div className="tempo-form-cell">
              <p className="lbl">Bakkestrategi</p>
              <div className="seg" role="group" aria-label="Bakkestrategi" title={HILLS[state.hill].t}>
                {(['fort', 'middels', 'sakte'] as HillKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={state.hill === k}
                    title={HILLS[k].t}
                    onClick={() => patch({ hill: k })}
                  >
                    {HILLS[k].l}
                  </button>
                ))}
              </div>
              <p className="help tempo-hill-hint">{HILLS[state.hill].t}</p>
            </div>
          </div>

          <div className="tempo-form-foot">
            <div className="drink-row">
              <span className="lbl">Drikkestopp</span>
              <button
                type="button"
                className={`switch ${state.drink ? 'on' : ''}`}
                role="switch"
                aria-checked={state.drink}
                aria-label="Drikkestopp"
                onClick={() => patch({ drink: !state.drink })}
              />
              <input
                className="stop"
                type="number"
                min={0}
                max={120}
                aria-label="Sekunder per stopp"
                disabled={!state.drink}
                value={state.stopOn}
                onChange={(e) => patch({ stopOn: Math.max(0, Math.min(120, Number(e.target.value) || 0)) })}
              />
              <span className="hint">s / stopp</span>
            </div>
            <div className="tempo-start">
              <label className="lbl" htmlFor="starttid">
                Starttid
              </label>
              <input
                id="starttid"
                type="time"
                value={state.dist === 'full' ? state.startFull : state.startHalf}
                onChange={(e) => patch(state.dist === 'full' ? { startFull: e.target.value } : { startHalf: e.target.value })}
              />
            </div>
            <p className="help tempo-drink-hint">
              {nStops} stasjoner × {plan.input.stopSec} s = {plan.S} s stopptid totalt.
            </p>
          </div>
        </div>

        <div className="result-col">
          {plan.warnings.map((w) => (
            <div key={w.title} className={`warn-card ${w.level}`} role="status">
              <strong>{w.title}</strong>
              <p>{w.text}</p>
            </div>
          ))}
          <div className="card result">
            <div className="result-hero">
              <p className="lbl">Flatfart p₀</p>
              <p className="flat">
                <b>{fmtP(plan.p0)}</b>
                <span> /km</span>
              </p>
              {state.hill !== 'middels' && (
                <p className="pill-note">
                  Flatfart: {fmtP(plan.p0)}/km (Middels: {fmtP(plan.p0mid)}/km)
                </p>
              )}
            </div>
            <div className="split-vis">
              <div className="split-vis-bar" aria-hidden="true">
                <span className="h1" style={{ flexGrow: Math.max(halfT, 1) }} />
                <span className="h2" style={{ flexGrow: Math.max(plan.input.T - halfT, 1) }} />
              </div>
              <div className="split-vis-key">
                <span>
                  <i /> 1. halvdel <b>{fmtT(halfT)}</b>
                </span>
                <span>
                  <i /> 2. halvdel <b>{fmtT(plan.input.T - halfT)}</b>
                </span>
              </div>
            </div>
            <div className="kpis">
              <Kpi icon={Gauge} label="Snittfart" value={`${fmtP(plan.input.T / plan.D)}/km`} />
              <Kpi icon={Flag} label="Halvveis" value={fmtT(halfT)} hint={`kl. ${clockDot(plan.input.start, halfT)}`} />
              <Kpi icon={Droplet} label="Stopptid" value={`${Math.round(plan.S)} s`} />
              <Kpi icon={Clock} label="I mål kl." value={clockDot(plan.input.start, plan.input.T)} />
            </div>
            <p className="note">
              <Info size={16} strokeWidth={1.75} />
              <span>
                Ved 5 km: {fmtT(t5)}, dvs. {behind}. Det er riktig, ikke et etterslep – klatringen mot Fjellveien ligger her.
              </span>
            </p>
          </div>
        </div>
        <StepContinue id="tempo-step-continue" step={3} label="Anbefalt løpeplan" onClick={goToLopeplan} />
      </div>
      <details className="explain">
        <summary>Slik regner planen</summary>
        <p>
          Hver 100 meter gjøres om til en flatekvivalent. Motbakke koster mer tid enn den samme nedoverbakken gir tilbake: f(g) = 1 + 0,033g + 0,0012g² oppover, og 1 + 0,018g + 0,0010g² nedover. Flatfarten p₀ er farten du holder der det er flatt.
        </p>
        <p>Middels betyr jevn innsats, ikke jevn fart. Tempoet faller i bakkene og øker nedover, slik at anstrengelsen holder seg jevn.</p>
        <p>
          Mellomtiden ved 5 km ligger bevisst bak jevn snittfart. Nesten all stigning kommer mellom km 3 og 8, opp mot Fjellveien. Å ligge bak klokka der er planen, ikke et etterslep.
        </p>
        <p>
          Sakte i bakkene gir ofte bedre sluttid i BCM enn en jevn klokke tilsier. Bakkene mellom km 3 og 8 og brosteinen i Munkebekksmauet straffer hard innsats. Strategien henter tid på flatene og skåner lårene ned Bellevuebakken.
        </p>
        <p className="help">Høydedata fra GPX-filen, glattet over 50 m. Mangler filen, brukes en reserveprofil.</p>
      </details>
    </section>
  );
}

function Kpi({ icon: Icon, label, value, hint }: { icon: LucideIcon; label: string; value: string; hint?: string }) {
  return (
    <div className="kpi">
      <span className="kpi-ico" aria-hidden="true">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span>{label}</span>
      <b>{value}</b>
      {hint && <em>{hint}</em>}
    </div>
  );
}
