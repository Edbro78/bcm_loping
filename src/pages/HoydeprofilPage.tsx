import { AdSlot } from '../components/AdSlot';
import { ElevationProfile } from '../components/ElevationProfile';
import { LazyCourseMap } from '../components/LazyCourseMap';

export function HoydeprofilPage() {
  return (
    <>
      <article className="about wrap">
        <div className="about-in">
          <p className="kicker ink">Løype</p>
          <h1>Høydeprofil og kart</h1>
          <p className="lead">
            Grafen viser stigning langs BCM-løypa fra Bryggen. Nesten all høydemeter ligger mellom km 3 og 8 mot Fjellveien. Hold markøren over profilen for å se punktet i kartet under.
          </p>
        </div>
      </article>

      <div className="wrap panels hoydeprofil-panels">
        <ElevationProfile />
      </div>
      <LazyCourseMap />

      <article className="about wrap about-after-panels">
        <div className="about-in">
          <p className="help">
            Høyder fra GPX når filen er lastet; ellers brukes en reserveprofil. Maraton er to runder på samme halvmaratontrasé. Har du satt måltid på forsiden, vises planlagt tid og fart i profilen.
          </p>
          <AdSlot slot="0000000002" />
        </div>
      </article>
    </>
  );
}
