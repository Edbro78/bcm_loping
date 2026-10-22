import { AdSlot } from '../components/AdSlot';
import { ElevationProfile } from '../components/ElevationProfile';
import { LazyCourseMap } from '../components/LazyCourseMap';
import { useUi } from '../i18n/useUi';

export function HoydeprofilPage() {
  const h = useUi().hoydeprofil;
  return (
    <>
      <article className="about wrap">
        <div className="about-in">
          <p className="kicker ink">{h.kicker}</p>
          <h1>{h.h1}</h1>
          <p className="lead">{h.intro}</p>
        </div>
      </article>

      <div className="wrap panels hoydeprofil-panels">
        <ElevationProfile />
      </div>
      <LazyCourseMap />

      <article className="about wrap about-after-panels">
        <div className="about-in">
          <p className="help">{h.help}</p>
          <AdSlot slot="0000000002" />
        </div>
      </article>
    </>
  );
}
