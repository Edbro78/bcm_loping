import { AdSlot } from '../components/AdSlot';

export function TempostrategiPage() {
  return (
    <article className="about wrap">
      <div className="about-in">
        <p className="kicker ink">Strategi</p>
        <h1>Tempostrategi på kupert bymaraton</h1>
        <p className="lead">
          På flat bane er pacing en regneøvelse. I Bergen er det en fordelingsoppgave: hvor mye vil du bruke før Fjellveien, hvor mye må du ha igjen til brostein og vind, og hva gjør andre runde på maraton med hodet ditt?
        </p>

        <h2>Motbakke: innsats, ikke fart</h2>
        <p>
          Når stigningsprosenten øker, bør puls og pust styre mer enn klokka på håndleddet. Mange løpere jager fordi kilometeren ser «langsom» ut på klokken, men biomekanisk jobber de hardere enn på flat mark. Modellen i tempoplanen bruker en forenklet kostnad for stigning og nedover – poenget er ikke perfeksjon, men å gi deg lov til å gå tregere opp uten å føle at dagen glipper.
        </p>
        <p>
          «Fort i bakker» som strategi betyr bevisst høyere innsats opp. Det kan fungere hvis du er sterk i motbakke og har testet det i trening. For de fleste halvmaraton- og maratondebutanter i Bergen er middels eller sakte bakkestrategi tryggere: du banker ikke pulsen i Nyhavnsveien, og du har råd til å løpe ned uten å riste lårene i fillebiter.
        </p>

        <h2>Nedoverbakke: kontrollert fall</h2>
        <p>
          Nedover ser ut som gratis tid, men muskulært er det eksentrisk belastning. Springer du for fort ned Bellevuebakken, kan du føle deg flytende – til Munkebekksmauet later som det er fjell. Strategien er å løpe nedover som du løper flat: jevn innsats, kortere steg der det er bratt, ingen «superman»-sprint.
        </p>
        <p>
          På maraton andre runde er nedoverbakker farlige fordi hjernen vil hente tapt tid. Det er sjelden der den ligger. Den ligger i disiplin på flatene etterpå.
        </p>

        <h2>Split: negativ, jevn eller positiv</h2>
        <p>
          Negativ split betyr roligere første halvdel av distansen (målt i innsats, ikke bare klokke). På BCM passer det fordi du ikke vet hvordan vinden langs Lungegårdsvann oppfører seg andre gang. Jevn split er enklere mentalt: du følger planen segment for segment. Positiv split – rask start – krever at du vet at du har margin. Fjellveien straffer den som allerede har brukt matches.
        </p>
        <p className="pull">
          Spørsmålet er ikke «kan jeg løpe 4:15/km opp?», men «vil jeg fortsatt kunne løpe 4:15/km etter at jeg har gjort det ti ganger?»
        </p>

        <h2>Maraton vs halvmaraton</h2>
        <p>
          Halvmaraton er en intensiv runde der feil i første tredelel er vanskelig å reparere, men du slipper å gjenta feilen. Maraton er to runder med samme terrengprofil. Den klassiske feilen er å løpe runde én som halvmaraton med litt ekstra i bakhånd. Cut-off ved Bryggen gjør at maraton ikke er «to halvmaratoner» – det er halvmaraton pluss en halvmaraton med allerede slitte bein.
        </p>
        <p>
          Praktisk råd: sett to måltider i kalkulatoren og sammenlign. Se hvor du passerer samme sted runde to mot runde én. Hvis runde to er mer enn et par minutter tregere i planen uten at du har endret strategi, er det normalt – spørsmålet er om du har trent for det.
        </p>
        <p>
          {/* TODO-ED: egen erfaring med negativ split vs jevn på BCM eller annen kupert maraton */}
          Legg inn din egen erfaring fra konkurranser med lignende profil. Det er det som gjør strategiartikkelen troverdig utover generelle råd.
        </p>
        <h2>Oppsummert sjekkliste</h2>
        <p>
          Før start: skriv flatfart og to klokkeslett (5 km og Fjellveien) på armen. Under løp: nedjustér forventning i motbakke, hold igjen i nedover, ikke jage snittfart før du er forbi Lungegårdsvann. Etter Fjellveien andre runde: vurder gange i bratt brostein som del av planen, ikke som nederlag.
        </p>

        <AdSlot slot="0000000006" />
        <AdSlot slot="0000000007" />
      </div>
    </article>
  );
}
