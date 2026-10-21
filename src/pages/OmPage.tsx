export function OmPage() {
  return (
    <article className="about wrap" id="om-siden">
      <div className="about-in">
        <p className="kicker ink">Om</p>
        <h1>Om denne løpeguiden</h1>
        <p className="lead">
          Dette nettstedet er en uavhengig løperguide for Bergen City Marathon. Det er ikke laget av, betalt av eller godkjent av TIF Viking, arrangøren av Bergen City Marathon, eller løpets sponsorer.
        </p>
        <p>
          Guiden startet som et personlig verktøy: jeg ville se løypa som tall og kart, ikke bare som en PDF, og jeg ville vite om måltiden min var i nærheten av det kroppen kunne levere de siste månedene før start. Siden er bygget rundt GPX-sporet, en enkel bakkekostnadsmodell og åpen kildekode i repoet – men det du leser her er ment for løpere, ikke utviklere.
        </p>
        <p>
          {/* TODO-ED: navn og kort bio om deg som behandlingsansvarlig / redaktør */}
          Redaktør og ansvarlig for innholdet er en enkeltperson som løper i Bergen-området. Kontaktadresse finner du på kontaktsiden. Bilder og personlige anekdoter merkes i teksten der de skal fylles inn, slik at siden kan bli mer «din» over tid uten å late som noe er dokumentert som ikke er det.
        </p>
        <h2>Hva siden er – og ikke er</h2>
        <p>
          Siden melder deg ikke på løp, selger ikke startnummer og viser ikke offisiell startliste. For påmelding, refusjon, starttider som gjelder alle, og endringer i programmet, gjelder alltid{' '}
          <a href="https://www.bergencitymarathon.no" target="_blank" rel="noopener">
            bergencitymarathon.no
          </a>
          . Guiden kan ha feil i høydedata (GPS støyer), forenkle vær og program, og modellere tempo på en måte som ikke passer din dag.
        </p>
        <p>
          Tempoplanen lagres i nettleseren på enheten din. Ingen server mottar måltid eller navn. Annonser leveres av Google AdSense etter at du eventuelt har gitt samtykke via Googles sertifiserte meldingsløsning; se personvernsiden for detaljer.
        </p>
        <h2>Kilder og metode</h2>
        <p>
          Løypa tegnes fra en GPX-fil som følger den offentlig tilgjengelige traséen. Drikkestasjoner og POI-er er plassert etter kart fra arrangøren, men avstander kan avvike noen meter. Formkrav i milepæler bygger på VDOT-tabeller og Riegels formel – standard løperfaglig stoff, ikke medisinsk rådgivning.
        </p>
        <p>
          Tekstene er skrevet for å være originale: taktiske vurderinger, ikke omskrevne pressemeldinger. Der fakta må verifiseres mot 2027-programmet, står det i TODO-listen som følger prosjektet.
        </p>
        <p className="pull">
          Hvis du finner feil, si fra via kontaktskjemaet – spesielt etter at nytt program publiseres.
        </p>
        <h2>Finansiering og annonser</h2>
        <p>
          Drift av domenet og utviklingstiden finansieres delvis gjennom annonser via Google AdSense. Det påvirker ikke hvilke råd som gis om pacing eller taktikk – modellen er den samme uansett. Lenker til arrangøren er tydelige, og siden konkurrerer ikke om påmelding, bare om forberedelse.
        </p>
        <p>
          Du kan bruke guiden uten konto og uten å oppgi personopplysninger til meg. Det eneste som lagres, er det du velger i nettleseren lokalt, som måltid og distanse. Les personvernsiden før du godtar annonser via Googles samtykkeløsning.
        </p>
        <p>
          Takk til løpere som har testet verktøyet tidlig og pekt på feil i GPX eller drikkestasjoner. Feil kan fortsatt finnes – bruk kontaktskjemaet med konkret kilometer og skjermbilde hvis du oppdager noe.
        </p>
        <p>
          Kildekoden ligger i git slik at endringer i løype eller modell kan spores over tid. Det betyr ikke at hver eneste commit er offentlig support, men at transparens om beregninger er mulig for den som vil grave.
        </p>
        <p>
          Domene og merkevare «BCM løpeguide» brukes her som beskrivelse av innholdet, ikke som løpsarrangør eller sponsor. Løpets offisielle navn nevnes kun for at du skal finne riktig helg og riktig by.
        </p>
      </div>
    </article>
  );
}
