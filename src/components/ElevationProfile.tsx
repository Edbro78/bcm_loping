import { ElevationSvg, useBoxWidth } from './chart';
import { sgn } from '../lib/format';
import { useActivePlan } from '../state/active';
import { useCourse } from '../state/course';

export function ElevationProfile() {
  const { plan } = useActivePlan();
  const course = useCourse();
  const { ref, w } = useBoxWidth();
  if (!plan) return <p className="intro">Laster høydeprofil…</p>;
  const { up, high, steep } = plan.elev;
  return (
    <section className="section" aria-labelledby="profil-tittel">
      <div className="section-head">
        <div>
          <h2 id="profil-tittel">Høydeprofil</h2>
          <p className="intro">Nesten all stigning ligger mellom km 3 og 8. Hold markøren over grafen for å se punktet i kartet.</p>
        </div>
        <div className="kpis three">
          <div className="kpi">
            <span>Høydemeter opp</span>
            <b>{Math.round(up)} m</b>
          </div>
          <div className="kpi">
            <span>Høyeste punkt</span>
            <b>{Math.round(high)} moh</b>
          </div>
          <div className="kpi">
            <span>Bratteste 100 m</span>
            <b>{sgn(steep)} %</b>
          </div>
        </div>
      </div>
      <div className="card elev-card" ref={ref}>
        <ElevationSvg plan={plan} points={course.points} width={w} />
        <p className="help">
          {course.status === 'ok' ? 'Høyder fra GPX, glattet over 50 m.' : 'Høyder fra reserveprofil, fordi GPX mangler.'}{' '}
          {plan.input.full && 'Maraton er to runder på halvmaratonløypa.'}
        </p>
      </div>
    </section>
  );
}
