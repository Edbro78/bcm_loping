import { StepContinue } from './StepContinue';
import { scrollToView, usePlan } from '../state/plan';

export function DistanceChoice() {
  const { state, patch } = usePlan();

  function goToSluttid() {
    patch({ view: 'plan' });
    scrollToView('plan');
  }

  return (
    <section className="section" aria-labelledby="distanse-tittel">
      <h2 id="distanse-tittel">Velge distanse</h2>
      <p className="intro">Velg halvmaraton eller maraton. Sluttid, plan og trening følger valget.</p>
      <div className="card distanse-card">
        <div className="seg" role="group" aria-label="Distanse">
          <button type="button" aria-pressed={state.dist === 'half'} onClick={() => patch({ dist: 'half' })}>
            Halvmaraton
          </button>
          <button type="button" aria-pressed={state.dist === 'full'} onClick={() => patch({ dist: 'full' })}>
            Maraton
          </button>
        </div>
      </div>
      <StepContinue id="distanse-step-continue" step={2} label="Ønsket sluttid" onClick={goToSluttid} />
    </section>
  );
}
