import { AdSlot } from '../components/AdSlot';
import { ElevationProfile } from '../components/ElevationProfile';
import { LazyCourseMap } from '../components/LazyCourseMap';
import { MileStages } from '../components/MilePage';

export function LoypeguidePage() {
  return (
    <article className="about wrap">
      <div className="about-in">
        <p className="kicker ink">Løype</p>
        <h1>Løypeguide: BCM-runden del for del</h1>
        <p className="lead">
          Halvmaraton er én runde på 21,097 km fra Bryggen og tilbake. Maraton er samme runde to ganger. Guiden følger den rekkefølgen du møter terrenget i, ikke startnummerets farge eller pulje.
        </p>

        <h2>Bryggen – start og mål</h2>
        <p>
          Startfeltet ligger i hjertet av turistbildet, men på løpsdagen er det arbeidsplass: trangt, travelt og ofte kjølig om morgenen. De første hundre meterne handler om å finne rytmen uten å bruke krefter på å sidepassere. Asphalt og brostein veksler allerede her. {/* TODO-ED: verifiser nøyaktig startcorridor for 2027 */}
        </p>
        <p>
          På maraton er du tilbake ved Bryggen midt i løpet, med cut-off som hard grense. Opplevelsen er helt annen andre gang: beina er tyngre, publikum har skiftet, og du vet hva som kommer. Målgang på halv er samme fysisk punkt, men uten den psykologiske omstarten.
        </p>

        <h2>Langs sjøen mot Gamle Bergen</h2>
        <p>
          Etter start går løypa ut langs vannet mot Sandviken. Dette er den «gratis» delen: flatt nok til at mange løper for fort. Vinden kommer ofte inn fra sjøen; den er sjelden dramatisk her, men den tar kantene av tempokledet. Underlaget er asfalt, og synet av fjorden er fint nok til at pulsen kan stige av begeistring – det er fortsatt ikke grunn til å jage minutter.
        </p>
        <p>
          Gamle Bergen passeres som et tydelig landemerke. For turister er det museum; for deg er det signal om at den egentlige jobben starter snart. Drikkestasjon ved Sandviken sykehus ligger i dette partiet. {/* TODO-ED: egen erfaring fra Gamle Bergen-passering – publikum, smal gate */}
        </p>

        <AdSlot slot="0000000002" />

        <h2>Nyhavnsveien og opp mot Fjellveien</h2>
        <p>
          Svingen inn fra sjøen og oppover er der mange opplever at «BCM begynner». Stigningen er jevn nok til at det er fristende å holde kilometerfart, men det er nettopp det tempoplanen advarer mot. Her skal du holde innsats, ikke tempo. Lårene og pusten skal jobbe, men uten å tømme tanken for det som kommer høyere oppe.
        </p>
        <p className="pull">
          Fjellveien er løypas signatur. Utsikten belønner den som tåler å gå noe av strekket. {/* TODO-ED: egen erfaring fra Fjellveien – gange vs løp, underlag */}
        </p>
        <p>
          Underlaget oppe i Fjellveien kan føles mer stiaktig enn sentrumsgater. Det er fortsatt løp, ikke terrengløp, men fotisensasjonen endres. Toppunktet kommer ikke med en skiltet «finish»-følelse; du merker det på at nedoverbakken tar over.
        </p>

        <h2>Ned mot Svartediket og byen igjen</h2>
        <p>
          Bellevuebakken og partiet mot Svartediket er nedover, men det er nedover du ikke skal «vinne» tid på. Lårene tar støyten. Mange løper for raskt her og betaler på brosteinen senere. Hold kontrollert fall, ikke sprint. Deretter flatere partier mot sykehus og campus – mulighet til å finne rytme igjen hvis du har spart riktig.
        </p>

        <h2>Store Lungegårdsvann og Nygårdsparken</h2>
        <p>
          Langs Store Lungegårdsvann er løypa åpen. Vind kan dytte eller hemme, avhengig av retning den dagen. Dette er et mentalt hull for mange: ingen bratt bakke å skylde på, bare jevn innsats mot horisonten. På maraton kommer du tilbake hit en gang til, ofte når beina føles tyngst. {/* TODO-ED: verifiser kilometerposisjon for vindutsatt parti */}
        </p>
        <p>
          Gjennom Nygårdsparken og videre mot havna er underlaget blandet. Det er fortsatt «billige» meter hvis du har hatt disiplin tidligere. Tenk på det som sparekonto, ikke kasino.
        </p>

        <AdSlot slot="0000000003" />

        <h2>Munkebekksmauet, Nordnes og hjem</h2>
        <p>
          Brostein i Munkebekksmauet er kort i meter, lang i opplevelse. Stegene blir korte, ankler arbeider, og frustrasjonen kan koke. Her lønner det seg å akseptere at farten faller uten at det betyr kollaps i planen. Nordnes og siste strekking mot Bryggen er psykologisk: du hører mål uten å være ferdig. Strandgaten hjem er flat nok til at de som har spart, kan presse kontrollert.
        </p>
        <p>
          Maraton andre runde gjentar alt dette med erfaring i beina. Samme bakker, samme brostein, samme vind – bare mer støy i hodet. Strategien bør være skrevet ned før du starter, ikke funnet opp ved Bryggen andre gang.
        </p>
      </div>

      <div className="wrap">
        <MileStages />
      </div>

      <div className="wrap panels">
        <ElevationProfile />
      </div>
      <LazyCourseMap />
    </article>
  );
}
