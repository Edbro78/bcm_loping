import { Link } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';
import { DistanceChoice } from '../components/DistanceChoice';
import { ElevationProfile } from '../components/ElevationProfile';
import { Hero } from '../components/Hero';
import { LazyCourseMap } from '../components/LazyCourseMap';
import { MilePage } from '../components/MilePage';
import { Splits, Wristband } from '../components/Splits';
import { TabBar } from '../components/TabBar';
import { OppsummeringPage } from '../components/OppsummeringPage';
import { TempoPlan } from '../components/TempoPlan';
import { usePlan } from '../state/plan';

function DashboardPanels() {
  const { state } = usePlan();
  return (
    <>
      {state.view !== 'oppsummering' && <TabBar />}
      <div className="wrap panels">
        {state.view === 'distanse' && <DistanceChoice />}
        {state.view === 'plan' && <TempoPlan />}
        {state.view === 'profil' && <ElevationProfile />}
        {state.view === 'splits' && <Splits />}
        {state.view === 'mile' && <MilePage />}
        {state.view === 'band' && <Wristband />}
        {state.view === 'oppsummering' && <OppsummeringPage />}
      </div>
      {state.view === 'profil' && <LazyCourseMap />}
    </>
  );
}

function HomeIntro() {
  return (
    <article className="about wrap home-intro">
      <div className="about-in">
        <h2>Mer om guiden</h2>
        <p>
          Denne siden er laget for løpere som skal ta halvmaraton eller maraton i Bergen, og som vil forstå løypa før startskuddet. Verktøyet over følger fire steg: velg distanse, sett måltid, les løpeplanen og sjekk milepæler de siste nitti dagene. Alt lagres lokalt i nettleseren – ingen konto.
        </p>
        <p>
          Bergen City Marathon er en byrunde som starter og slutter ved Bryggen. Maratonløpere tar to runder; halvmaraton én. Det som skiller denne guiden fra et generelt løpsmagasin, er at den er bygget rundt den faktiske traséen: høydeprofil fra GPS-spor, drikkestasjoner plassert der de ligger i praksis, og en tempomodell som lar deg være «bak klokka» der det stiger uten å panikke.
        </p>
        <p>
          Mange kommer til BCM med et måltid fra flat mark. Da er det lett å undervurdere hvor mye Fjellveien og brosteinen i sentrum koster. Guiden viser ikke bare hvor det går opp og ned, men hva det betyr for pacing: jevn innsats i motbakke er ikke det samme som jevn kilometerfart. Kalkulatoren regner om sluttiden din til flatfart, segmenttider og klokkeslett ved kjente steder, slik at du kan skrive et armbåndskort som tåler virkeligheten.
        </p>
        <p>
          Innholdet er skrevet analytisk, ikke kopiert fra arrangørens nettsider. Der jeg mangler egne bilder eller personlige erfaringer fra konkrete partier, står det markert i teksten – det er bevisst, slik at siden vokser med dine notater og foto etter hvert. Fakta som starttider, cut-off og program kan endre seg; sjekk alltid{' '}
          <a href="https://www.bergencitymarathon.no" target="_blank" rel="noopener">
            bergencitymarathon.no
          </a>{' '}
          for påmelding og offisielle oppdateringer.
        </p>
        <h2>Artikler og dypdykk</h2>
        <ul className="home-links" style={{ color: 'inherit' }}>
          <li>
            <Link to="/loypeguide">Løypeguide</Link> – Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nygårdsparken og Nordnes.
          </li>
          <li>
            <Link to="/hoydeprofil">Høydeprofil og løypekart</Link> – interaktiv graf og kart over løypa.
          </li>
          <li>
            <Link to="/tempoplan">Tempoplan</Link> – hvordan kalkulatoren på forsiden tenker pacing.
          </li>
          <li>
            <Link to="/tempostrategi">Tempostrategi</Link> – hvordan fordele krefter på kupert bylløype.
          </li>
          <li>
            <Link to="/praktisk">Praktisk</Link> – garderobe, transport, overnatting og utstyr.
          </li>
          <li>
            <Link to="/trening">Trening</Link> – siste tolv uker og bakkearbeid mot Fjellveien.
          </li>
        </ul>
        <p className="pull">
          Nesten all merkbart stigning på runden ligger mellom sjøen ved Sandviken og toppen av Fjellveien. Resten av guiden kan leses som en kommentar til den setningen.
        </p>
        <p>
          {/* TODO-ED: egen erfaring fra første BCM eller generalprøve på halve runden */}
          Har du løpt runden før, er din egen historie verdt mer enn noen tabell. Legg den inn der markøren står, så blir siden din like mye som den er generisk.
        </p>
        <AdSlot slot="0000000001" />
      </div>
    </article>
  );
}

export function HomePage() {
  const { state } = usePlan();
  return (
    <>
      <Hero />
      <DashboardPanels />
      {state.view !== 'oppsummering' && <HomeIntro />}
    </>
  );
}
