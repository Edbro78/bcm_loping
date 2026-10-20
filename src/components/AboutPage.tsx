export function AboutPage() {
  return (
    <article className="about wrap" id="om-siden">
      <div className="about-in">
        <p className="kicker ink">BCM 2027</p>
        <h1>Om siden</h1>
        <p className="lead">
          Dette er en løypeguide, en tempoplanlegger og et treningskart for Fjordkraft Bergen City Marathon, lørdag 24. april 2027. Den er laget for den som skal løpe halvmaraton eller maraton i Bergen, og som vil vite hvor bakkene ligger, når klokka bør vise hva, og hva som er rimelig å kreve av formen de siste tre månedene.
        </p>
        <p>
          Siden er ett verktøy med flere flater, ikke en bunke løse artikler. Distanse, måltid, bakkestrategi og starttid settes ett sted og følger med overalt. Bytter du fra halv til hel, tegnes løypa som to runder, drikkestasjonene dobles, armbåndskortet får nye linjer, og milepælene hentes fra maratontabellen. Endrer du sluttiden med ett minutt, flytter mellomtidene, klokkeslettene og advarslene seg med en gang. Ingenting av dette sendes til en server. Valgene ligger i nettleseren på denne enheten, slik at planen er der neste gang du åpner siden.
        </p>
        <p>
          Guiden er uoffisiell. Løypekart og deltakerinfo er hentet fra bergencitymarathon.no, været fra yr.no og Meteorologisk institutt, og formkravene fra VDOT-tabellen til Jack Daniels sammen med Riegels formel. Tempomodellen er en forenkling. Høyde fra GPS støyer. På løpsdagen er kroppen sjefen, og planen er et utgangspunkt, ikke en fasit.
        </p>

        <h2>Slik er siden bygget</h2>
        <p>
          Øverst ligger en fast meny. Logoen BCM 2027 fører tilbake til innholdet. Deretter kommer fanene i den rekkefølgen de fleste bruker verktøyet: Velge distanse, Måltiden din, Anbefalt plan for løpet, Milepæler, Høydeprofil, Armbåndskort og Kart. Om siden, som du leser nå, er den siste fanen. Under menyen, når du ikke er her, ligger en rad med de samme verktøyfanene, med ikon, slik at du kan bytte uten å scrolle opp. Kart har ingen egen flate i den raden. Den åpner høydeprofilen og ruller ned til kartet, fordi profil og kart hører sammen: det du peker på i grafen, lyser opp i terrenget.
        </p>
        <p>
          Helt til høyre i toppmenyen, og igjen i det mørke feltet under, sitter valget mellom halv og hel. De to bryterne styrer det samme. Halv er én runde på 21,097 kilometer med start klokken 09.00. Hel er to runder, 42,194 kilometer, med start klokken 07.45. Starttidene kan du senere flytte selv, og halv og hel husker hver sin. Det samme gjelder måltiden. Du kan derfor legge en halvmaraton på 1:45 og en maraton på 3:30 side om side, og hoppe mellom dem uten å taste på nytt.
        </p>
        <p>
          Første gang du kommer inn, åpnes Måltiden din. Sist du var her, åpnes den fanen du forlot, også denne teksten. Et lite hopp-til-innhold-lenke ligger skjult til den får tastaturfokus, slik at den som navigerer uten mus slipper å gå gjennom hele menyen.
        </p>

        <h2>Forsiden du møter først</h2>
        <p>
          Under menyen ligger et mørkt felt med løpets navn og en nedtelling til start. Nedtellingen følger distansen du har valgt. Halv teller mot klokken 09.00, maraton mot 07.45, begge lørdag 24. april 2027, norsk sommertid. Den viser dager, timer, minutter, sekunder og hundredeler, og oppdateres ti ganger i sekundet. Når starttidspunktet er passert, står det at løpet har startet, og tallene blir stående på null.
        </p>
        <p>
          Ved siden av klokka forteller et merke om løypa er klar. Mens sporet leses, står det at løypa lastes. Når GPX-filen er inne og har nok punkter, står det at traséen er eksakt. Mangler filen, eller er den for tynn, brukes en reserveprofil for høyden, og merket sier at høydedata er estimert. En eventuell feilmelding vises rett under, så du ser hvorfor kartet ikke er det ekte sporet.
        </p>
        <p>
          Fire steg forklarer rekkefølgen i verktøyet, uten å late som om du må følge den slavisk. Først velger du distanse. Så setter du ønsket sluttid. Deretter leser du den anbefalte løpeplanen. Til slutt ser du milepælene for de siste nitti dagene av treningen. Stegene er en lesehjelp, ikke en lås. Alle flater er åpne med en gang.
        </p>
        <p>
          Nederst i feltet løper en tynn høydeprofil fra Bryggen og tilbake til Bryggen. Den er tegnet av det innlastede sporet og merker Gamle Bergen, Fjellveien, Lungegårdsvannet, Nordnes og målgang. En prikk beveger seg langs linjen på omtrent atten sekunder, hviler et øyeblikk i mål og begynner på nytt. Kilometeret står ved prikken. Du kan dra langs linjen med mus eller finger, eller bruke piltastene når grafen har fokus, og prikken følger hånden. Har du bedt systemet om mindre bevegelse, tegnes hele profilen med en gang og animasjonen uteblir.
        </p>
        <p className="pull">
          Nesten all stigning i Bergen City Marathon ligger mellom kilometer tre og åtte. Det er den setningen resten av siden er bygget rundt.
        </p>

        <h2>Velge distanse</h2>
        <p>
          Den første verktøyfanen er den roligste. Der står to knapper, halvmaraton og maraton, og en setning om at sluttid, plan og trening følger valget. Det finnes ingen flere innstillinger her, med vilje. Distanse er det valget som endrer alt annet, og den fortjener en egen flate før tallene begynner.
        </p>
        <p>
          Halvmaraton er én runde: ut fra Bryggen, langs sjøen til Sandviken, opp Nyhavnsveien og Fjellveien, ned Bellevuebakken, rundt Store Lungegårdsvann, gjennom havna, over brosteinen i Munkebekksmauet, ut på Nordnes og hjem Strandgaten til Torget. Maraton er den samme runden to ganger. Andre runde har de samme bakkene, den samme brosteinen og det samme vindhullet langs vannet, bare med flere kilometer i beina. En ekstra drikkestasjon på Bryggen, rundt 21,5 kilometer, finnes bare for maraton.
        </p>
        <p>
          Høydemeter er ikke et offisielt tall i guiden. Erfarne løpere anslår omtrent 200 til 235 meter stigning per runde, og det dobbelte for maraton. Siden regner sin egen sum ut fra sporet, glattet, og viser den på høydeprofilen. Den kan avvike fra anslaget, fordi GPS-høyde sjelden er pen.
        </p>

        <h2>Måltiden din</h2>
        <p>
          Tempoplanleggeren er hjertet. Den fordeler tiden etter jevn innsats i bakkene, ikke etter jevn fart på klokka. En jevn kilometerfart gjennom Fjellveien er ikke jevn innsats. Den er et angrep. Planen lar farten falle der det stiger, og hente seg inn der det flater ut eller heller ned, slik at anstrengelsen holder seg noenlunde lik.
        </p>
        <p>
          Du setter målet på tre måter, og de holdes i takt. Feltet tar imot en tid du skriver, for eksempel 1:45:00 eller 3:30. Klarer ikke feltet å lese det du skriver, merkes det som ugyldig og den forrige gyldige tiden blir stående når du forlater feltet. Under feltet ligger hurtigvalg. For halv er de sub 1:20, 1:30, 1:40, 1:45, 1:50, 2:00 og 2:15. For hel er de sub 2:45, 3:00, 3:15, 3:30, 3:45, 4:00 og 4:30. Skyveknappen under lar deg gå minutt for minutt, fra én time til fire timer på halv og fra to timer til seks timer på hel. Ved siden av feltet står snittfarten målet tilsvarer, regnet flatt over hele distansen, uten hensyn til bakker.
        </p>
        <p>
          Split-strategien sier hvordan de to halvdelene skal forholde seg til hverandre. Jevn betyr at innsatsen ikke skal drive med vilje, verken fortere eller saktere, utover det bakkene krever. Negativ betyr en roligere første halvdel og en raskere andre. Positiv er det motsatte, et åpningsløp du betaler for sent. Hvor sterk driften er, styres av sigma, fra null til fem prosent i halve steg. På jevn er skyveknappen slått av, fordi det ikke er noe avvik å skalere. Sigma virker lineært langs distansen: tidlig ligger du på den ene siden av flatfarten, sent på den andre, og midten er nøytral.
        </p>
        <p>
          Bakkestrategien har tre trinn. Fort presser motbakkene og slipper seg ned. Pulsen blir høyere, og risikoen også. Middels er konstant innsats, det som løpere kaller jevn GAP: tregere opp, raskere ned, uten å legge ekstra vilje oppå terrenget. Sakte sparer motbakkene og skåner lårene nedover, og henter tiden på flatene. Under knappene står en setning som bytter seg med valget, så du ikke trenger å huske hva ordene betyr. Velger du noe annet enn middels, viser resultatfeltet både din flatfart og den flatfarten middels ville krevd for samme sluttid, slik at du ser hva strategien koster i fart på sletta.
        </p>
        <p>
          Drikkestopp er en bryter. På legger du inn sekunder per stasjon, fra null til 120. Halv har fem stasjoner, hel elleve: de fem, en gang til på andre runde, pluss Bryggen ved 21,5. Står bryteren av, regner planen likevel to sekunder per stasjon, fordi kø, kryss og en kopp som ikke treffer munnen koster litt uansett. Hjelpeteksten viser regnestykket: antall stasjoner ganger sekunder, og summen som trekkes fra løpstiden før farten beregnes. Starttid er et klokkefelt. Halv begynner på 09:00 og hel på 07:45, og du kan flytte dem hvis puljen din går senere. Klokkeslettene i tabeller, kart og armbånd bruker den tiden du har satt.
        </p>
        <p>
          Til høyre, eller under på smal skjerm, ligger resultatet. Flatfart, kalt p₀, er farten du skal holde der bakken er omtrent flat, etter at stopp og terreng er trukket fra. En stolpe viser første og andre halvdel som to lengder, med tidene under. Fire tall oppsummerer planen: snittfart over hele distansen, tiden og klokkeslettet halvveis, samlet stopptid, og klokkeslettet i mål. En merknad peker på femkilometeren. Der ligger du som regel bak jevn snittfart, og det er meningen. Klatringen mot Fjellveien sitter mellom kilometer tre og åtte. Å være førti sekunder bak klokka der er planen, ikke et etterslep du skal jage inn i den bratteste bakken.
        </p>
        <p>
          Advarsler kommer bare når de har noe å si. Ligger maratonplanen slik at du passerer Bryggen etter klokken 10.45, kommer en feil: du blir stoppet og registrert for halvmaraton. Går målet over makstid, fire timer på halv og seks på hel, sies det med det samme. Får en kilometer målfart raskere enn 3:00 eller tregere enn 12:00 per kilometer, varsles den som urealistisk, med hvilke kilometer det gjelder. Fort i bakkene kombinert med positiv split får en egen advarsel, fordi den kombinasjonen legger innsatsen tidlig, der Fjellveien kan ta mer enn den gir tilbake.
        </p>
        <p>
          Nederst kan du åpne «Slik regner planen». Der står modellen i klartekst. Hver hundre meter gjøres om til en flatekvivalent. Stigning koster mer tid enn den samme nedoverbakken gir tilbake. Oppover brukes f(g) = 1 + 0,033g + 0,0012g², nedover f(g) = 1 + 0,018g + 0,0010g², der g er stigning i prosent. Stigningen klippes ved tjue prosent, så en enkelt GPS-spiss ikke får ødelegge en kilometer. Brosteinen i Munkebekksmauet, omtrent kilometer 17,8 til 18,4 på runden, får et lite tillegg. Flatfarten er den ukjente som får summen av alle disse bitene, pluss stoppene, til å lande på måltiden din. Høyden kommer fra GPX-filen og glattes over femti meter. Mangler filen, brukes reserveprofilen.
        </p>

        <h2>Anbefalt plan for løpet</h2>
        <p>
          Fanen med den anbefalte planen viser det tempoplanen har regnet ut, stykke for stykke. Øverst ligger en graf med tre lag: målfart, GAP og høyde. Målfart er den farten klokka skal vise, inkludert det du taper i bakken. GAP er den flatekvivalente farten, altså hvor hardt stykket er når terrenget er regnet bort. Der de to skiller lag, er bakken årsaken, ikke disiplinen.
        </p>
        <p>
          Under grafen velger du segmenter eller per kilometer. Segmentene følger steder, ikke runde tall. På halv går de fra start via Gamle Bergen, drikkestasjonene, toppen av Fjellveien, Svartediket, Grønneviksøren, Møhlenpris, Hurtigruteterminalen, toppen av Munkebekksmauet, Nordnes og i mål. På hel gjentas runden, halvveis merkes som cut-off, Bryggen får sin maratonstasjon, og 25, 30, 35 og 40 kilometer flettes inn der de ikke allerede er et sted. Hver rad har navn, terrengmerke, kilometerområde, lengde i meter, stigning i prosent, høydemeter opp og ned, segmenttid, fart, GAP, kumulativ tid, klokkeslett og avvik mot jevn snittfart. Avviket er bevisst. Negativt tall, i den forstand siden bruker, betyr at du ligger foran den jevne klokka. Positivt betyr at du ligger bak, slik du skal gjøre etter Fjellveien. Radene er farget etter terreng: klatring, flatt, nedover eller brostein. På maraton deles tabellen i runde én og runde to, med sum for hver runde.
        </p>
        <p>
          Per kilometer er den samme planen i jevne biter. Siste bit kan være kortere enn en kilometer, og merkes med den ekte distansen, 21,1 eller 42,2, ikke med et oppdiktet heltall. Bratte kilometer, tre prosent eller mer, får en ekstra linje som oversetter målfarten til flat ekvivalent, så en seksminutters kilometer opp Fjellveien ikke ser ut som en dårlig kilometer. Drikkestopp vises som sekunder lagt til den kilometeren stasjonen ligger i. På maraton skjærer et bånd gjennom tabellen ved halvveis og minner om cut-off klokken 10.45 på Bryggen.
        </p>
        <p>
          Referansetabellen ligger foldet sammen, for den som vil sammenligne uten å flytte på sitt eget mål. Den regner et sett faste sluttider med middels bakker, jevn split og drikke av. Raden nærmest målet ditt er markert. For maraton finnes i tillegg en liten tabell over strategier for sub 3:00: middels, sakte og fort med jevn split, og middels eller sakte med to prosent negativ, pluss middels med to prosent positiv. Der ser du hva 5 kilometer, 10 kilometer, passering på Bryggen og flatfarten blir under hver av dem, med start 07:45 og de stille to sekundene per stasjon.
        </p>

        <h2>Armbåndskortet</h2>
        <p>
          Armbåndskortet er den samme planen, kokt ned til det som får plass på armen. Det er et kort med distanse, måltid, et utvalg steder og klokkeslett, flatfart, bakkestrategi, split og starttid. Halvmaraton merker Gamle Bergen, 5 kilometer, toppen av Fjellveien, 10 kilometer, Grønneviksøren, 15 kilometer, Hurtigruten, Nordnesparken og mål. Maraton merker 5, toppen, 10, 15, halvveis, 25, toppen av Fjellveien på andre runde, 30, 35, 40 og mål. Halvveis og mål er uthevet. Knappen «Skriv ut kortet» åpner utskriftsdialogen i nettleseren, så du kan legge kortet i en plastlomme under startnummeret eller teipe det på armen. Tallene er de samme som i tabellen. Endrer du målet, er kortet allerede nytt neste gang du ser på det.
        </p>

        <h2>Milepæler de siste nitti dagene</h2>
        <p>
          Milepælfanen svarer på et annet spørsmål enn løpsdagen. Ikke hvor fort du skal løpe i Munkebekksmauet, men om måltiden er i familie med formen du kan bygge på tre måneder. Kravene kommer fra VDOT og Riegel, i en tabell for halv og en for hel. Tempoplanen din slår opp i den tabellen som hører til distansen. Treffer du en rad nøyaktig, brukes den. Ligger du mellom to rader, interpoleres kravene lineært, og teksten sier hvilke to rader som ble brukt. Ligger målet utenfor tabellen, klemmes oppslaget til nærmeste ende, og du får vite at nærmeste rad er brukt. Din omtrentlige VDOT står ved matrisa.
        </p>
        <p>
          Øverst står anbefalt kilometer per uke de siste tre månedene, og minstetider på 3, 5 og 10 kilometer. Tidene er intervaller. Kravet er å løpe raskere enn, eller innenfor, den trege enden. Under intervallet står den farten den trege enden tilsvarer. En stolpediagram tegner tretten uker. Uke 1 begynner mandag 25. januar 2027, nitti dager før løpet. Høyden på stolpene følger en fast form, skalert til midten av volumintervallet ditt: rolig start, bygging, en lettere uke hver fjerde, topp i uke 9 til 11, og en løpsuke som er kraftig nedtrappet. Fargene deler perioden i grunntrening, oppbygging, toppbelastning og nedtrapping. Uke 4, 8 og 10 er merket med testene.
        </p>
        <p>
          De tre testkortene er konkrete. Milepæl 1 er 3 kilometer i uke 4, milepæl 2 er 5 kilometer i uke 8, milepæl 3 er 10 kilometer i uke 10, hver lørdag i den uken, med antall dager igjen til løpet. Under kravet står to dommer. Klarer du den trege enden eller bedre, regnes måltiden som realistisk mot tabellen. Ligger du mer enn et lite margin over, femten sekunder på 3 kilometer, tretti på 5 og ett minutt på 10, peker tabellen mot en tregere måltid, og kortet sier hvilken. Testene gjelder flat vei. Bergen byr ikke på flat vei, og siden later ikke som noe annet.
        </p>
        <p>
          Kravsmatrisa viser alle radene: måltid, VDOT, minstetid på 3, 5 og 10 kilometer, og ukesvolum. Din rad, eller den nærmeste, er merket. Naboradene som interpoleringen står på, er også merket, så du ser hvor tallet kommer fra. Dette er ikke en treningsplan med økter, intervaller og langturer. Det er et formkrav og en volumbue. Hva du legger i ukene, er fortsatt ditt.
        </p>

        <h2>Etapper, drikke, vær og det praktiske</h2>
        <p>
          Under kravene ligger løypa som ni etapper, de samme på begge distanser, gjentatt på maraton. Hvert kort har kilometer, navn, profil, underlag og en taktisk setning, pluss tiden planen din gir fra start til slutt av etappen. På maraton står også andre runde. Etappene er sjøen ut til Gamle Bergen, klatringen opp til Fjellveien, selve Fjellveien til høyeste punkt, Bellevuebakken ned mot Svartediket, nedover forbi Haraldsplass og Haukeland til Møllendal, det flate og vindutsatte partiet langs Store Lungegårdsvann til Møhlenpris, den stille havna, brosteinen i Munkebekksmauet ut til Nordnesparken, og til slutt Strandgaten hjem. Underlaget er asfalt, bortsett fra brosteinen og partier som føles stiaktige oppe i Fjellveien. Ingen grus.
        </p>
        <p>
          Taktikkene er korte fordi løypa er kjent. Start behersket langs sjøen. I Nyhavnsveien skal du holde flatpulsen, ikke tempoet. På Fjellveien er utsikten en del av poenget, og høyeste punkt kommer mot slutten. Ned Bellevuebakken skal du ikke presse, nettopp for å skåne lårene. Etterpå handler det om å finne rytmen, holde fart i vinden, overleve det mentale hullet i havna, ta korte steg på brosteinen og gjerne gå de bratteste meterne, og så bruke nedoverbakken mot Torget.
        </p>
        <p>
          Drikkestasjonene ligger ved Sandviken sykehus på 3,5, Fjellveien ved Tippetue på 7,2, Haraldsplass på 10, AdO arena på 14 og Nordnes skole på 19. Mellom AdO og Nordnes er det fem kilometer uten drikke, og tidslinjen merker det hullet. Maraton legger til Bryggen på 21,5 og gjentar de fem på andre runde, elleve i alt. Hver linje viser planlagt passeringstid og klokkeslett ut fra din start. Stasjonene serverer vann først, deretter sportsdrikk, bananer og mørk sjokolade. Toalettene langs runden er listet med kilometer og et hopp mot kartet: Fjellveien ved «Hesten trenger hvile», Svartediket, starten av Møllendalsveien, Møhlenpris og Nordnesparken. Utenfor løypa nevnes Vikinghallen, Sandbrogaten og Bryggen ved Nikolaikirkealmenningen.
        </p>
        <p>
          Været er ærlige april i Bergen, ikke en solskinnsbrosjyre. Klimanormalen for Bergen-Florida, 1991 til 2020, ligger oppe: snitt av maksimum 11,1 grader, døgnmiddel 7,2, snitt av minimum 3,9, 140,6 millimeter nedbør, fjorten dager med minst en millimeter, 72 prosent luftfuktighet og 222 soltimer. Ved siden av står løpsdagen 2023 som verst tenkelig: to grader ved start, regn, hagl, sludd og korte solglimt, aldri varmere enn fire–fem grader. Prognosen for selve dagen, time for time fra klokken 07 til 14, hentes først fra Meteorologisk institutt og deretter fra Open-Meteo hvis den første ikke svarer. Den hentes ikke før det er omtrent ni dager igjen, og teksten sier hvor mange dager det er til vinduet åpner, rundt 15. april 2027. Før det vises normalen.
        </p>
        <p>
          Bekledningsrådet følger den kaldeste timen i det som faktisk vises. Tre grader eller kaldere betyr lange tights, langermet, tynn vindjakke, lue og hansker. Opp til sju grader betyr shorts eller trekvart tights, trøye med armvarmere eller tynn langermet, pannebånd og tynne hansker. Opp til tolv grader betyr shorts og t-skjorte, med tynne hansker du kan ta av. Varmere enn det, uvanlig for april, betyr singlet og shorts, og drikke på alle stasjoner. Er det ventet mer enn en millimeter nedbør i vinduet, legges det til et tynt lag du kan kaste. Vindavsnittet peker på kilometer 12 til 16, og 33 til 37 på maraton, der løypa går åpent langs Store Lungegårdsvann. Der får vinden tak. Rådet er å søke ly i en gruppe, og å ha spart kreftene til Fjellveien er unnagjort.
        </p>
        <p>
          Det praktiske er merket som 2026-programmet, fordi 2027 ikke er publisert ennå. Tabellen viser garderobe som åpner 06.30 i Vikinghallen, tøyoppbevaring fra 07.00 ved Festningskaien, maratonstart 07.45, halvmaraton i puljer mellom 09.00 og 10.00, cut-off for maraton på Bryggen 10.45, stafett 11.15, femkilometer 12.15 og tøyoppbevaring som stenger 15.00. Raden som hører til din distanse er uthevet, og cut-off er merket som den harde grensen den er. Ved siden av står makstid igjen, koordinatene til tøyoppbevaring og til Vikinghallen der expo og garderobe holder til, og en påminnelse om at gater langs løypa stenges mens feltet passerer. Omkjøring må sjekkes på arrangørens sider nærmere dagen.
        </p>

        <h2>Høydeprofilen</h2>
        <p>
          Høydeprofilen gjør bakkene til en figur du kan lese uten tabell. Tre tall står øverst: høydemeter opp, høyeste punkt i meter over havet, og den bratteste hundremetern i prosent. Oppover regnes bare når sporet har steget minst tre meter siden forrige referanse, så små GPS-ristinger ikke blir til fjell. På maraton dobles stigningen, fordi runden løpes to ganger. Grafen fargelegges etter terreng, med de samme fargene som etappene: klatring, flatt, nedover og brostein. Fjellveien og Munkebekksmauet er navngitt på tegningen, den siste også på andre runde når du har valgt hel.
        </p>
        <p>
          Holder du markøren over grafen, eller drar fingeren, følger en leselinje med kilometer, høyde, stigning, tid, klokkeslett og fart. Det samme punktet sendes til kartet, så profil og terreng er ett blikk og ikke to. Teksten under grafen sier om høyden kommer fra GPX, glattet over femti meter, eller fra reserveprofilen. På maraton minner den om at det er to runder.
        </p>

        <h2>Kartet</h2>
        <p>
          Kartet tegner den eksakte traséen fra GPX-filen og farger den etter målfart sammenlignet med flatfarten din. Fire trinn, som også skilles med ord i tegnforklaringen: raskere, som flatfart, litt tregere og mye tregere. Fargene alene skal ikke bære meningen. En grønn bit er der planen lar deg løpe fortere enn p₀. En mørk blå bit er omtrent flatfart. Oker er litt tregere, rød er mye tregere, typisk i klatringen. Legenden ligger på kartet. Fordi fargen kommer fra din plan, endrer løypa uttrykk når du endrer mål eller strategi. Den er ikke en fast «vanskelighetsfarge» for Bergen. Den er din dag, tegnet oppå byen.
        </p>
        <p>
          Fire lag kan slås av og på, og valget huskes. Drikke, toalett, stafettveksling, og bratt og brostein. Start og rene infopunkter ligger alltid ute: start og mål på Bryggen, tøyoppbevaring på Festningskaien, expo og garderobe i Vikinghallen. Stafettpunktene er nummerert fra Gamle Bergen til Nordnesparken. Noen punkter er merket som omtrentlige, og popup-vinduet sier det. Bryggen-drikken vises bare på maraton. Trykker du en markør, får du navn, type, kilometer, en kort beskrivelse der den finnes, og planlagt passering. På halv er det ett klokkeslett. På hel er det runde én og runde to. En knapp åpner stedet i Google Maps.
        </p>
        <p>
          Du kan se kartet i to dimensjoner eller i tre. Todimensjonalt er et vanlig kart. Tredimensjonalt heller perspektivet, slik at Fjellveien kjennes som en kant og ikke som en strek. Under løpet av visningen kan du trykke «Fly langs løypa». En tur på én runde tar omtrent ett minutt og et kvarter i normal fart, og maraton tar det dobbelte fordi distansen er dobbel. Sakte er halvparten, rask er det dobbelte. På hver drikkestasjon stopper ferden ett sekund, og et merke sier drikke. Underveis viser et lite panel tid, kilometer, stedet du sist passerte, terrengtypen, om farten der er raskere, jevn eller tregere enn stykket før, og mellomtiden. Pause fryser ferden. Fortsett slipper den. Er sporet bare reserveprofilen, ligger et overlegg på kartet som sier at traséen er omtrentlig.
        </p>
        <p>
          Under kartet kan du laste ned GPX-filen. Flisene, gråkartet, flyfoto og terreng, ligger i selve guiden. Kartet fungerer uten API-nøkkel og uten å spørre en karttjeneste i det øyeblikket du panorerer, så lenge siden er lastet. En foldet tabell lister kilometer null til 21 med nærmeste sted og høyde, for den som vil lese runden som tekst.
        </p>
        <p>
          Hover mellom profil og kart er toveis i den forstand at punktet du utforsker i profilen, er punktet kartet kjenner. Flyturen setter det samme punktet. Du kan derfor stå i høydeprofilen, dra langs Fjellveien, og vite at kartet snakker om den samme meteren.
        </p>

        <h2>Det siden husker, og det den ikke er</h2>
        <p>
          Alt du stiller inn, skrives til lokal lagring i nettleseren: distanse, de to måltidene, split, sigma, bakkestrategi, drikkebryter, sekunder per stopp, de to starttidene, om du sist så segmenter eller per kilometer, hvilken fane som var åpen, kartlagene og om kartet sto i tre dimensjoner. Tømmer du nettleserdata, eller åpner siden i et annet nettleserprogram, begynner den på standarden: halvmaraton, 1:30, jevn split, to prosent sigma, middels bakker, drikke av med ti sekunder klare i feltet, start 09:00 og 07:45. En egen GPX du har lagt inn tidligere, kan også ligge lagret og brukes i stedet for standardsporet. Standardsporet er filen som følger med guiden.
        </p>
        <p>
          Siden prøver ikke å være arrangøren. Den melder deg ikke på, den tar ikke betalt, og den lover ikke at programmet for 2027 blir likt 2026. Cut-off, makstid og stasjonenes meny er slik de er kjent fra løpet, og de kan endres. Når arrangøren publiserer noe annet, er det deres sider som gjelder. Modellen vet ikke om vindkastet på Store Lungegårdsvann den dagen, om du sov, eller om brosteinen er våt. Den vet om en forenklet bakkekostnad, en split du har valgt, og et spor.
        </p>
        <p>
          Brukt slik den er tenkt, er rekkefølgen rolig. Velg distanse. Sett en sluttid du har grunn til å tro på, og les advarselen hvis du ikke har det. Se om femkilometeren ligger bak klokka, og la den gjøre det. Skriv ut armbåndskortet når tallene har fått ligge en dag. De siste nitti dagene før løpet er milepælene et speil, ikke en dom: en 10-kilometer som lander i intervallet, betyr at tabellen kjenner igjen målet ditt. En som ikke gjør det, peker mot en annen rad, og raden er der for å bli valgt. Selve løpet, fra Bryggen og opp, er fortsatt det kartet og profilen allerede har vist deg.
        </p>
      </div>
    </article>
  );
}
