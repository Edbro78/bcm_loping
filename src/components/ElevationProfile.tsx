import { ElevationSvg, useBoxWidth } from './chart';
import { sgn } from '../lib/format';
import { useUi } from '../i18n/useUi';
import { useActivePlan } from '../state/active';
import { useCourse } from '../state/course';

export function ElevationProfile() {
  const { plan } = useActivePlan();
  const course = useCourse();
  const { ref, w } = useBoxWidth();
  const m = useUi();
  const p = m.elevationPanel;
  if (!plan) return <p className="intro">{p.loading}</p>;
  const { up, high, steep } = plan.elev;
  return (
    <section className="section" aria-labelledby="profil-tittel">
      <div className="section-head">
        <div>
          <h2 id="profil-tittel">{p.h2}</h2>
          <p className="intro">{p.intro}</p>
        </div>
        <div className="kpis three">
          <div className="kpi">
            <span>{p.elevUp}</span>
            <b>{Math.round(up)} m</b>
          </div>
          <div className="kpi">
            <span>{p.elevHigh}</span>
            <b>
              {Math.round(high)} {p.moh}
            </b>
          </div>
          <div className="kpi">
            <span>{p.elevSteep}</span>
            <b>{sgn(steep)} %</b>
          </div>
        </div>
      </div>
      <div className="card elev-card" ref={ref}>
        <ElevationSvg plan={plan} points={course.points} width={w} />
        <p className="help">
          {course.status === 'ok' ? p.helpGpx : p.helpFallback}{' '}
          {plan.input.full && p.fullLaps}
        </p>
      </div>
    </section>
  );
}
