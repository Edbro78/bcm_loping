import { AdSlot } from '../components/AdSlot';
import { HomeToolLink } from '../components/HomeToolLink';

export function TreningPage() {
  return (
    <article className="about wrap">
      <div className="about-in">
        <p className="kicker ink">Oppkjøring</p>
        <h1>Trening mot løpsdagen</h1>
        <p className="lead">
          Ingen tabell erstatter ukene du har lagt ned, men du kan sjekke om måltiden du drømmer om, henger sammen med formen du faktisk har. Milepælene i verktøyet bruker VDOT/Riegel som speil – ikke som dom.
        </p>
        <HomeToolLink>Åpne milepæler og formkrav på forsiden (steg 4 i hero).</HomeToolLink>

        <h2>De siste tolv ukene</h2>
        <p>
          Tolv uker før løpet er nok tid til å skjerpe utholdenhet uten å bygge opp for mye tretthet. Uke 1–4: stabil grunntrening, én kvalitetsøkt per uke (tempo eller intervaller), langtur som gradvis nærmer seg halve distansen du skal løpe. Uke 5–8: øk volum forsiktig, ta bakkeøkter inn i planen, og bruk uke 4 og 8 til korte testløp (3 km og 5 km) mot milepælene i verktøyet.
        </p>
        <p>
          Uke 9–11: toppbelastning med lengste langtur for halvmaratonløpere, eller to langturer for maraton med den siste som «dress rehearsal» med måltid og drikke. Uke 12: kraftig nedtrapping – halvparten av volumet, korte strøk for å holde beina våkne, ekstra søvn.
        </p>

        <h2>Baktrening mot Fjellveien</h2>
        <p>
          Hvis du bor flat, finn bro, parkeringshus eller kort bakke og repeter kontrollerte oppdrag. Poenget er ikke maks hastighet opp, men å lære kroppen å jobbe uten å sprenge pulsen. Kombiner bakkeintervaller med rolig jogg ned – samme muskelmønster som løypa, uten å slite lårene som på Bellevue før du er i form.
        </p>
        <p>
          Én økt per uke med 6–10 repetisjoner på 60–90 sekunder opp og jogg ned er nok for mange. Alternativt: langtur med planlagte gangepartier opp – det er ikke feil på BCM, det er taktikk.
        </p>

        <h2>Testene og måltiden</h2>
        <p>
          Milepælverktøyet oppdateres når du endrer måltid på forsiden. Klarer du testene innenfor intervallet, er målet i familie med tabellen. Ligger du over med margin, peker systemet mot en tregere rad – det er en invitasjon til å justere forventning, ikke til å gi opp.
        </p>
        <p className="pull">
          Tren på det du skal møte: brostein tåler korte steg, vind tåler gruppe, bakke tåler ydmykhet.
        </p>
        <p>
          {/* TODO-ED: egen treningslogg eller ukeplan du faktisk fulgte */}
          Lim inn din egen ukeplan eller erfaringer fra oppkjøringen når du har dem – det gjør siden mer enn en generisk mal.
        </p>
        <AdSlot slot="0000000009" />
      </div>
    </article>
  );
}
