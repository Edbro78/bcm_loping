import { AdSlot } from '../components/AdSlot';
import { MilePractical, MileAid, MileWeather } from '../components/MilePage';

export function PraktiskPage() {
  return (
    <>
      <article className="about wrap">
        <div className="about-in">
          <p className="kicker ink">Før start</p>
          <h1>Praktisk til Bergen City Marathon</h1>
          <p className="lead">
            Løpsdagen handler om mer enn fart. Garderobe, transport, søvn og hva du har i sekken avgjør om tempoplanen får en fair sjanse. Tabellene under bygger på tilgjengelig programinformasjon; 2027-programmet kan avvike. {/* TODO-ED: verifiser program, tider og steder når 2027 publiseres */}
          </p>

          <h2>Start og mål</h2>
          <p>
            Start og mål ligger ved Bryggen. Maraton starter tidligere enn halvmaraton, og feltet er delt i puljer. Kom i god tid – kø ved bag drop og toaletter spiser av roen. Cut-off for maraton ved halvveis er en hard grense: passering etter fristen betyr stopp og halvmaratonregistrering, uansett hvordan du føler formen er.
          </p>

          <h2>Transport til Bryggen</h2>
          <p>
            Bergen sentrum er kompakt, men veiene stenges når løpet går. Planlegg ankomst med gangavstand fra overnatting, eller kollektivt til nærmeste holdeplass utenfor sperringene. {/* TODO-ED: verifiser anbefalt ankomstpunkt og kollektivruter løpsdagen 2027 */} Unngå å forlate bilen på gateparkering som kan bli blokkert av omkjøringsruter.
          </p>

          <AdSlot slot="0000000008" />

          <h2>Garderobe og tøyposen</h2>
          <p>
            Garderobe og expo ligger samlet et annet sted enn start – sjekk kartet i tabellen under. Legg klær du skal ha etter mål i posen kvelden før, med navn og startnummer synlig. April i Bergen kan bety alt fra sol til sludd; bekledningsråd under værseksjonen er laget for det.
          </p>

          <h2>Overnatting</h2>
          <p>
            Mange booker hotell innen gangavstand til Bryggen eller Bybanen. Book tidlig – BCM helgen fyller sentrum. Tenk på frokost: åpningstider på restauranter kan være korte tidlig lørdag. {/* TODO-ED: egne hotell-/frokostanbefalinger */}
          </p>

          <h2>Det du bør ha med</h2>
          <p>
            Startnummer festet, pins eller ekstra strikk, salve/vaselin der det trengs, gammel genser i tøyposen, sekkepose rundt telefonen hvis det regner, og et armbåndskort med klokkeslett fra tempoplanen. Lader og powerbank er undervurdert når du venter i startområdet lenge.
          </p>
        </div>
      </article>
      <div className="wrap">
        <MilePractical />
        <MileAid />
        <MileWeather />
      </div>
    </>
  );
}
