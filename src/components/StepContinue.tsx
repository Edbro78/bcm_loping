import { useUi } from '../i18n/useUi';

type StepContinueProps = {
  id: string;
  /** Next step number shown in the badge (2–5). */
  step: number;
  /** Defaults to hero.steps[step - 1] for the current locale. */
  label?: string;
  onClick: () => void;
};

export function StepContinue({ id, step, label, onClick }: StepContinueProps) {
  const m = useUi();
  const stepLabel = label ?? m.hero.steps[step - 1] ?? '';
  return (
    <div className="step-continue-wrap" id={id}>
      <button
        type="button"
        className="step-continue-btn"
        onClick={onClick}
        aria-label={m.stepContinue.aria.replace('{n}', String(step)).replace('{label}', stepLabel)}
      >
        <span className="step-continue-step" aria-hidden="true">
          {step}
        </span>
        <span className="step-continue-text">
          <span className="step-continue-kicker">{m.stepContinue.nextStep}</span>
          <span className="step-continue-label">{stepLabel}</span>
        </span>
        <span className="step-continue-arrow" aria-hidden="true" />
      </button>
    </div>
  );
}
