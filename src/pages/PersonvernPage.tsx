export function PersonvernPage() {
  return (
    <article className="about wrap" id="personvern">
      <div className="about-in">
        <p className="kicker ink">Personvern</p>
        <h1>Personvernerklæring</h1>
        <p className="intro">
          Denne erklæringen gjelder bergencitymarathon.com (uavhengig løpeguide). Behandlingsansvarlig er{' '}
          {/* TODO-ED: navn og e-post behandlingsansvarlig */}
          eier av nettstedet, kontaktbar på{' '}
          <a href="mailto:edvard.brother@outlook.com">edvard.brother@outlook.com</a>.
        </p>

        <h2>Google AdSense og informasjonskapsler</h2>
        <p>
          Nettstedet viser annonser levert av Google AdSense. Google og dennes partnere kan bruke informasjonskapsler og lignende teknologi for å vise annonser, måle ytelse og i noen tilfeller vise personlig tilpassede annonser basert på tidligere besøk på dette og andre nettsteder.
        </p>
        <p>
          Les mer om hvordan Google bruker data fra nettsteder som bruker Google-produkter:{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">
            Google – hvordan Google bruker data fra nettsteder eller apper som bruker tjenestene våre
          </a>
          . Teknisk dokumentasjon om annonser:{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">
            Googles annonseteknologi
          </a>
          .
        </p>
        <p>
          Samtykke til annonser håndteres via Googles sertifiserte CMP under «Privacy &amp; messaging» i AdSense-kontoen (ikke et eget banner bygget inn i denne siden). AdSense-scriptet lastes på innholdssider slik at det kan kobles til den løsningen.
        </p>
        <p>
          Du kan reservere deg mot tilpasset annonsering hos Google på{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener">
            Annonseinnstillinger
          </a>
          , og via bransjeinitiativer som{' '}
          <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener">
            Your Online Choices (EU)
          </a>
          . Du kan også slette eller blokkere informasjonskapsler i nettleseren; da kan annonser bli mindre relevante.
        </p>

        <h2>Lokal lagring og analyse</h2>
        <p>
          Tempoplan, distansevalg, kartlag og eventuell egen GPX lagres i nettleserens lokale lagring (localStorage) på enheten din. Disse dataene sendes ikke til behandlingsansvarlig. Nettstedet bruker ikke egen server-side analyse i dag; trafikk kan likevel måles av Google som annonseleverandør.
        </p>

        <h2>Eksterne tjenester</h2>
        <p>
          Kartfliser ligger hostet sammen med siden. Nær løpsdagen kan nettleseren hente værvarsel fra Meteorologisk institutt og Open-Meteo; da kan disse tjenestene se IP-adressen din som ved et vanlig nettbesøk. Kontaktskjemaet åpner e-postklienten din lokalt – meldingen sendes ikke via server.
        </p>

        <h2>Dine rettigheter</h2>
        <p>
          Etter personvernforordningen (GDPR) har du rett til innsyn, retting, sletting, begrensning, dataportabilitet og å protestere mot behandling der det er hjemmel for det. For data som kun ligger i nettleseren din, kan du slette nettstedsdata via nettleserinnstillinger. Klage kan rettes til Datatilsynet:{' '}
          <a href="https://www.datatilsynet.no" target="_blank" rel="noopener">
            datatilsynet.no
          </a>
          .
        </p>
        <h2>Behandlingsgrunnlag</h2>
        <p>
          Lokal lagring skjer på ditt initiativ når du bruker tempoplanleggeren (berettiget interesse / teknisk nødvendig for funksjonen du ber om). Annonser behandles på grunnlag av samtykke der CMP krever det, og berettiget interesse der loven tillater måling uten personlig profilering.
        </p>
        <h2>Lagringstid</h2>
        <p>
          Data i localStorage blir liggende til du sletter nettstedsdata eller til nettleseren tømmes. Serverlogger hos hosting (Vercel) kan finnes i begrenset tid i henhold til leverandørens vilkår; guiden logger ikke måltid sentralt.
        </p>
        <h2>Barn og unge</h2>
        <p>
          Nettstedet er ikke rettet mot barn. Tempoplanleggeren krever ikke alder, men lagrer data lokalt uten foreldresamtykke. Foreldre som deler en enhet bør være klar over at localStorage deles mellom brukere på samme nettleserprofil.
        </p>
        <h2>Overføring til tredjeland</h2>
        <p>
          Google AdSense og tilknyttede annonsenettverk kan behandle data i land utenfor EØS med standardkontraktsbestemmelser eller tilsvarende grunnlag. Se Googles dokumentasjon for detaljer om databehandlere.
        </p>
        <h2>Kontakt ved henvendelser</h2>
        <p>
          For innsyn, sletting eller spørsmål om behandling, send e-post til adressen på kontaktsiden. Legg gjerne ved hvilken side du brukte og hvilken nettleser, så kan jeg peke deg til riktig sted for å slette localStorage.
        </p>
        <p>
          Jeg svarer så raskt jeg kan, normalt innen noen dager. Klager til Datatilsynet kan du alltid sende uavhengig av om du har kontaktet meg først.
        </p>
        <h2>Endringer</h2>
        <p>
          Erklæringen oppdateres ved endringer i annonseoppsett eller nye tjenester. Vesentlige endringer vil dateres nederst på siden. Erklæringen er oppdatert oktober 2026.
        </p>
      </div>
    </article>
  );
}
