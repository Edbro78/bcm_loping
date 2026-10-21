import { AdSlot } from '../components/AdSlot';
import { DistanceChoice } from '../components/DistanceChoice';
import { TempoPlan } from '../components/TempoPlan';
import { Splits } from '../components/Splits';

export function TempoplanPage() {
  return (
    <>
      <article className="about wrap">
        <div className="about-in">
          <p className="kicker ink">Verktøy</p>
          <h1>Tempoplan og kalkulator</h1>
          <p className="lead">
            Kalkulatoren fordeler sluttiden din etter jevn innsats i bakkene – ikke jevn fart på klokka. Det er forskjellen mellom å «holde 4:30» og å komme i mål uten å ha sprunget livet ut av deg i Nyhavnsveien.
          </p>
          <h2>Slik bruker du verktøyet</h2>
          <p>
            Velg først distanse: halvmaraton eller maraton. Sett deretter måltid du realistisk kan stå inne for. Du kan skrive tiden direkte, bruke hurtigvalg eller skyve minutt for minutt. Split-strategi styrer om første halvdel skal være roligere (negativ split), lik (jevn) eller aggressiv (positiv). Bakkestrategi sier om du vil presse motbakker, holde jevn GAP eller spare deg til flatene.
          </p>
          <p>
            Drikkestopp kan legges inn som sekunder per stasjon. Selv uten bevisst stopp regner modellen et lite tap ved hver stasjon, fordi kø og koppen tar tid uansett. Starttid påvirker klokkeslett i tabellene – nyttig hvis puljen din ikke går på første start.
          </p>
          <AdSlot slot="0000000004" />
        </div>
      </article>

      <div className="wrap panels" id="kalkulator">
        <DistanceChoice />
        <TempoPlan />
      </div>

      <article className="about wrap">
        <div className="about-in">
          <AdSlot slot="0000000005" />
          <h2>Slik tolker du resultatet</h2>
          <p>
            Flatfarten (p₀) er farten du skal holde der bakken er omtrent flat, etter at stopp og terreng er trukket fra. Målfart per kilometer vil variere: treg opp, rask ned. At du ligger bak jevn snittfart ved fem kilometer er ofte riktig, ikke et tegn på svikt – stigningen mot Fjellveien sitter tidlig på runden.
          </p>
          <p>
            Negativ split passer mange på kupert løype fordi du ikke tømmer tanken før du har sett toppen av Fjellveien. Positiv split kan fungere for erfarne som vet nøyaktig hva de tåler, men kombinert med «fort i bakker» er det høy risiko. Jevn innsats er standarden modellen anbefaler når du er usikker.
          </p>
          <p>
            Advarslene i kalkulatoren er bevisste: makstid, urealistiske kilometerfarter, maraton cut-off ved Bryggen, og kombinasjoner som historisk har endt i bonk. Ta dem som samtalestarter, ikke som forbud.
          </p>
          <p className="pull">
            Skriv ut armbåndskortet når tallene har ligget urørt en dag. Planen du tror på tirsdag kveld, er ofte den du faktisk kan følge lørdag morgen.
          </p>
        </div>
      </article>

      <div className="wrap panels">
        <Splits />
      </div>
    </>
  );
}
