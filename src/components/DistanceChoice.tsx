import { StepContinue } from './StepContinue';
import { useUi } from '../i18n/useUi';
import { scrollToView, usePlan } from '../state/plan';

export function DistanceChoice() {
  const { state, patch } = usePlan();
  const m = useUi();

  function goToSluttid() {
    patch({ view: 'plan' });
    scrollToView('plan');
  }

  return (
    <section className="section" aria-labelledby="distanse-tittel">
      <h2 id="distanse-tittel">{m.distance.title}</h2>
      <p className="intro">{m.distance.intro}</p>
      <div className="card distanse-card">
        <div className="seg" role="group" aria-label={m.distance.aria}>
          <button type="button" aria-pressed={state.dist === 'half'} onClick={() => patch({ dist: 'half' })}>
            {m.distance.half}
          </button>
          <button type="button" aria-pressed={state.dist === 'full'} onClick={() => patch({ dist: 'full' })}>
            {m.distance.full}
          </button>
        </div>
      </div>
      <StepContinue id="distanse-step-continue" step={2} label={m.hero.steps[1]!} onClick={goToSluttid} />
    </section>
  );
}
