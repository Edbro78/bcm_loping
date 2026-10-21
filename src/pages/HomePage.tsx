import { Link } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';

export function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="wrap">
          <p className="kicker" style={{ color: 'var(--c-oker)' }}>
            Uavhengig guide · Bergen City Marathon 2027
          </p>
          <h1>Løype, tempo og trening – uten å være arrangøren</h1>
          <p>
            Denne siden er laget for løpere som skal ta halvmaraton eller maraton i Bergen, og som vil forstå løypa før startskuddet. Her finner du etapper beskrevet med taktikk, en tempokalkulator som fordeler tiden etter bakker, og praktisk info samlet på ett sted. Alt er uavhengig av TIF Viking og det offisielle arrangementet.
          </p>
        </div>
      </section>
      <article className="about wrap">
        <div className="about-in">
          <p>
            Bergen City Marathon er en byrunde som starter og slutter ved Bryggen. Maratonløpere tar to runder; halvmaraton én. Det som skiller denne guiden fra et generelt løpsmagasin, er at den er bygget rundt den faktiske traséen: høydeprofil fra GPS-spor, drikkestasjoner plassert der de ligger i praksis, og en tempomodell som lar deg være «bak klokka» der det stiger uten å panikke.
          </p>
          <p>
            Mange kommer til BCM med et måltid fra flat mark. Da er det lett å undervurdere hvor mye Fjellveien og brosteinen i sentrum koster. Guiden viser ikke bare hvor det går opp og ned, men hva det betyr for pacing: jevn innsats i motbakke er ikke det samme som jevn kilometerfart. Kalkulatoren regner om sluttiden din til flatfart, segmenttider og klokkeslett ved kjente steder, slik at du kan skrive et armbåndskort som tåler virkeligheten.
          </p>
          <AdSlot slot="0000000001" />
          <p>
            Innholdet er skrevet analytisk, ikke kopiert fra arrangørens nettsider. Der jeg mangler egne bilder eller personlige erfaringer fra konkrete partier, står det markert i teksten – det er bevisst, slik at siden vokser med dine notater og foto etter hvert. Fakta som starttider, cut-off og program kan endre seg; sjekk alltid{' '}
            <a href="https://www.bergencitymarathon.no" target="_blank" rel="noopener">
              bergencitymarathon.no
            </a>{' '}
            for påmelding og offisielle oppdateringer.
          </p>
          <h2>Hva du finner her</h2>
          <ul className="home-links" style={{ color: 'inherit' }}>
            <li>
              <Link to="/loypeguide">Løypeguide</Link> – Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nygårdsparken og Nordnes, med kart og høydeprofil.
            </li>
            <li>
              <Link to="/tempoplan">Tempoplan</Link> – kalkulator, split-strategi og tabell for løpsdagen.
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
          <p>
            Tempoplanen og kartene lagres lokalt i nettleseren din. Ingen konto, ingen server som husker måltiden. Det gjør siden enkel, men det betyr også at du bør skrive ut eller lagre det viktigste selv før løpsdagen.
          </p>
          <p className="pull">
            Nesten all merkbart stigning på runden ligger mellom sjøen ved Sandviken og toppen av Fjellveien. Resten av guiden kan leses som en kommentar til den setningen.
          </p>
          <p>
            {/* TODO-ED: egen erfaring fra første BCM eller generalprøve på halve runden */}
            Har du løpt runden før, er din egen historie verdt mer enn noen tabell. Legg den inn der markøren står, så blir siden din like mye som den er generisk.
          </p>
        </div>
      </article>
    </>
  );
}
