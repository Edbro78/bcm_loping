export const ui = {
  nb: {
    brand: 'BCM løpeguide',
    nav: {
      mainMenu: 'Hovedmeny',
      home: 'Forside',
      loypeguide: 'Løypeguide',
      hoydeprofil: 'Høydeprofil og løypekart',
      tempoplan: 'Tempoplan',
      tempostrategi: 'Tempostrategi',
      praktisk: 'Praktisk',
      trening: 'Trening',
      om: 'Om',
      menu: 'Meny',
    },
    skipLink: 'Hopp til innhold',
    footer: {
      independence:
        'Dette er en uavhengig løperguide. Den er ikke tilknyttet TIF Viking, Bergen City Marathon eller løpets sponsorer. For påmelding og offisiell informasjon, bruk bergencitymarathon.no.',
      sources:
        'Kilder til kart og program: bergencitymarathon.no og yr.no / met.no. Tempomodellen er forenklet; høydedata fra GPS kan avvike. Planen er et utgangspunkt – kroppen på løpsdagen er fasit.',
      about: 'Om siden',
      contact: 'Kontakt',
      privacy: 'Personvern',
    },
    hero: {
      kicker: 'Bergen City Marathon 2027 · uavhengig guide',
      h1: 'BCM løpeguide, tempoplanlegger og milepæler',
      countdown: {
        started: 'Løpet har startet',
        untilHalf: 'Nedtelling til start kl. 09.00',
        untilFull: 'Nedtelling til start kl. 07.45',
        units: {
          days: 'Dager',
          hours: 'Timer',
          minutes: 'Minutter',
          seconds: 'Sekunder',
          hundredths: 'Hundredeler',
        },
      },
      course: {
        loading: 'Laster løype…',
        ok: 'GPX lastet inn · eksakt trasé',
        warn: 'Høydedata estimert',
      },
      stepsAria: 'Slik bruker du verktøyet',
      steps: [
        'Velge distanse (hel eller halv)',
        'Ønsket sluttid',
        'Anbefalt løpeplan',
        'Anbefalte milepæler siste 90 dager av treningen',
        'Oppsummering',
      ] as const,
      stepsShort: ['Distanse', 'Sluttid', 'Plan', 'Milepæler', 'Oppsummering'] as const,
      stepAction: 'Trykk her',
      trykk: 'Trykk for å åpne',
      stepAria: 'Steg {n}: {text}. Trykk for å åpne.',
      sparkAria: 'Høydeprofil fra Bryggen til mål',
      places: ['Bryggen', 'Gamle Bergen', 'Fjellveien', 'Lungegårdsvann', 'Nordnes', 'Bryggen'] as const,
    },
    tabBar: {
      tablist: 'Faner',
      profil: 'Høydeprofil',
      band: 'Armbåndskort',
    },
    stepContinue: {
      nextStep: 'Neste steg',
      aria: 'Neste steg {n}: {label}',
    },
    distance: {
      title: 'Velge distanse',
      intro: 'Velg halvmaraton eller maraton. Sluttid, plan og trening følger valget.',
      half: 'Halvmaraton',
      full: 'Maraton',
      aria: 'Distanse',
    },
    splits: {
      chartExpand: 'Åpne løpeplan-graf i fullskjerm, liggende',
      chartExpandHint: 'Trykk for fullskjerm',
      chartFullscreenTitle: 'Målfart langs løypa',
      closeFullscreen: 'Lukk',
    },
    tempoPlan: {
      loading: 'Laster tempoplan…',
      h2: 'Ønsket sluttid',
      intro: 'Jevn innsats i bakkene – alt oppdateres mens du endrer, og lagres på enheten.',
      labels: {
        split: 'Split-strategi',
        hill: 'Bakkestrategi',
        drink: 'Drikkestopp',
        flatP0: 'Flatfart p₀',
        summaryTitle: 'Slik regner planen',
        help: 'Høydedata fra GPX-filen, glattet over 50 m. Mangler filen, brukes en reserveprofil.',
      },
    },
    oppsummering: {
      loading: 'Laster oppsummering…',
      h2: 'Oppsummering',
      intro: 'Kort oversikt over planen din – klar til å lagre, kopiere eller dele.',
      dl: {
        distance: 'Distanse',
        targetTime: 'Ønsket sluttid',
        avgFlat: 'Snitt / flatfart',
        finishPlan: 'I mål (plan)',
      },
      strategy: {
        h3: 'Strategi',
        split: 'Split:',
        hills: 'Bakker:',
        drink: 'Drikke:',
        course: 'Løype:',
        courseNote:
          'Jevn innsats i bakkene – planen tåler at du ligger bak snittfart opp mot Fjellveien.',
        drinkOn: '{stopSec} s per stopp ({totalSec} s totalt)',
        drinkOff: 'Av ({totalSec} s modellert)',
      },
      milestones: {
        h3: 'Treningsmilepæler',
        daysBefore: '({days} dager før løpet)',
        calendar: 'Kalender (.ics)',
      },
      training: {
        h3: 'Trening',
      },
      armband: {
        h3: 'Armbåndskort',
        help: 'Mellomtid og klokkeslett ved kjente steder – skriv ut og fest på armen.',
      },
      export: {
        h3: 'Hele planen som tekst',
        help: 'Om du vil lagre planen til senere.',
        textareaAria: 'Oppsummering som tekst',
        copyPlan: 'Kopier plan',
        downloadTxt: 'Last ned .txt',
        planCopied: 'Plan kopiert',
      },
      facebook: {
        h3: 'Del på Facebook',
        help: 'Kort versjon med overskrift og lenke til arrangøren.',
        textareaAria: 'Tekst for sosiale medier',
        copyPost: 'Kopier innlegg',
        downloadTxt: 'Last ned .txt',
        postCopied: 'Facebook-tekst kopiert',
      },
      copyFailed: 'Kunne ikke kopiere – prøv last ned i stedet.',
    },
    armband: {
      print: 'Skriv ut armbånd',
    },
    hoydeprofil: {
      kicker: 'Løype',
      h1: 'Høydeprofil og kart',
      intro:
        'Grafen viser stigning langs BCM-løypa fra Bryggen. Nesten all høydemeter ligger mellom km 3 og 8 mot Fjellveien. Hold markøren over profilen for å se punktet i kartet under.',
      help:
        'Høyder fra GPX når filen er lastet; ellers brukes en reserveprofil. Maraton er to runder på samme halvmaratontrasé. Har du satt måltid på forsiden, vises planlagt tid og fart i profilen.',
    },
    contact: {
      kicker: 'BCM 2027',
      h1: 'Kontakt',
      intro:
        'Send et spørsmål om løypa, tempoplanen eller siden. Meldingen åpnes i e-postprogrammet ditt, ferdig adressert, og sendes derfra.',
      name: 'Navn',
      email: 'E-post',
      question: 'Spørsmål',
      emailError: 'Skriv en e-postadresse vi kan svare til.',
      questionError: 'Skriv spørsmålet, minst et par ord.',
      submit: 'Send spørsmål',
      sent: 'E-posten er klar i e-postprogrammet ditt. Trykk send der, så går den til {email}.',
      mailtoSubject: 'Spørsmål til BCM-løpeguiden',
      mailtoNameLine: 'Navn: {name}',
      mailtoEmailLine: 'E-post: {email}',
      nameNotGiven: '(ikke oppgitt)',
    },
    notFound: {
      h1: 'Siden finnes ikke',
      intro: 'Lenken kan være gammel, eller adressen er skrevet feil. Bruk menyen over, eller gå tilbake til forsiden.',
      home: 'Til forsiden',
    },
    homeIntro: {
      h2s: ['Mer om guiden', 'Artikler og dypdykk'] as const,
      paragraphs: [
        'Denne siden er laget for løpere som skal ta halvmaraton eller maraton i Bergen, og som vil forstå løypa før startskuddet. Verktøyet over følger fire steg: velg distanse, sett måltid, les løpeplanen og sjekk milepæler de siste nitti dagene. Alt lagres lokalt i nettleseren – ingen konto.',
        'Bergen City Marathon er en byrunde som starter og slutter ved Bryggen. Maratonløpere tar to runder; halvmaraton én. Det som skiller denne guiden fra et generelt løpsmagasin, er at den er bygget rundt den faktiske traséen: høydeprofil fra GPS-spor, drikkestasjoner plassert der de ligger i praksis, og en tempomodell som lar deg være «bak klokka» der det stiger uten å panikke.',
        'Mange kommer til BCM med et måltid fra flat mark. Da er det lett å undervurdere hvor mye Fjellveien og brosteinen i sentrum koster. Guiden viser ikke bare hvor det går opp og ned, men hva det betyr for pacing: jevn innsats i motbakke er ikke det samme som jevn kilometerfart. Kalkulatoren regner om sluttiden din til flatfart, segmenttider og klokkeslett ved kjente steder, slik at du kan skrive et armbåndskort som tåler virkeligheten.',
        'Innholdet er skrevet analytisk, ikke kopiert fra arrangørens nettsider. Der jeg mangler egne bilder eller personlige erfaringer fra konkrete partier, står det markert i teksten – det er bevisst, slik at siden vokser med dine notater og foto etter hvert. Fakta som starttider, cut-off og program kan endre seg; sjekk alltid bergencitymarathon.no for påmelding og offisielle oppdateringer.',
      ] as const,
      linkBlurbs: {
        loypeguide: 'Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nygårdsparken og Nordnes.',
        hoydeprofil: 'interaktiv graf og kart over løypa.',
        tempoplan: 'hvordan kalkulatoren på forsiden tenker pacing.',
        tempostrategi: 'hvordan fordele krefter på kupert bylløype.',
        praktisk: 'garderobe, transport, overnatting og utstyr.',
        trening: 'siste tolv uker og bakkearbeid mot Fjellveien.',
      },
      pull:
        'Nesten all merkbart stigning på runden ligger mellom sjøen ved Sandviken og toppen av Fjellveien. Resten av guiden kan leses som en kommentar til den setningen.',
      closing:
        'Har du løpt runden før, er din egen historie verdt mer enn noen tabell. Legg den inn der markøren står, så blir siden din like mye som den er generisk.',
    },
    meta: {
      '/': {
        title: 'Bergen City Marathon 2027 – uavhengig løypeguide',
        description:
          'Uavhengig guide til løypa i Bergen: tempoplan, etapper, trening og praktisk info for halvmaraton og maraton. Ikke tilknyttet arrangøren.',
      },
      '/loypeguide': {
        title: 'Løypeguide Bergen City Marathon 2027',
        description:
          'Løypa del for del: Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nygårdsparken og Nordnes – med taktikk og underlag.',
      },
      '/hoydeprofil': {
        title: 'Høydeprofil og kart – Bergen City Marathon 2027',
        description:
          'Interaktiv høydeprofil og kart over BCM-løypa: stigning mot Fjellveien, etapper og drikkestasjoner.',
      },
      '/tempoplan': {
        title: 'Tempoplan og kalkulator – Bergen City Marathon',
        description:
          'Regn ut jevn innsats på kupert bylløype: måltid, split-strategi, bakker og drikkestopp tilpasset BCM-løypa.',
      },
      '/tempostrategi': {
        title: 'Tempostrategi på kupert maraton og halvmaraton',
        description:
          'Hvordan fordele krefter i motbakke og nedoverbakke på Bergen City Marathon – uten å jage klokka opp Fjellveien.',
      },
      '/praktisk': {
        title: 'Praktisk før løpsdagen – Bergen City Marathon',
        description:
          'Start og mål, garderobe, transport til Bryggen, overnatting og det du bør ha med i sekken.',
      },
      '/trening': {
        title: 'Trening mot Bergen City Marathon 2027',
        description:
          'Oppkjøring de siste tolv ukene, bakketrening mot Fjellveien og formkrav knyttet til måltiden din.',
      },
      '/om': {
        title: 'Om denne løpeguiden',
        description:
          'Hvem som står bak siden, hvorfor den finnes, og at den er uavhengig av TIF Viking og Bergen City Marathon.',
      },
      '/kontakt': {
        title: 'Kontakt',
        description: 'Send spørsmål om løypa, tempoplanen eller nettstedet.',
      },
      '/personvern': {
        title: 'Personvernerklæring',
        description: 'Informasjonskapsler, Google AdSense, lokal lagring og dine rettigheter.',
      },
    },
    summaryExport: {
      header: 'BCM 2027 – min løpeplan',
      tempoSection: 'Tempo og strategi',
      planSection: 'Løpeplan i korte trekk',
      planNote:
        'Planen følger jevn innsats i bakkene – du skal ligge bak jevn snittfart opp mot Fjellveien, ikke jage klokka der.',
      halfway: 'Halvveis',
      finish: 'I mål',
      milestonesSection: 'Anbefalte testmilepæler (siste 90 dager)',
      trainingSection: 'Trening',
      official: 'Offisiell info og påmelding:',
      generated: 'Generert med BCM løpeguide.',
      fbTitle: 'Min plan for BCM i 2027!',
      fbTests: 'Testmilepæler:',
      milestoneTitles: ['Milepæl 1', 'Milepæl 2', 'Milepæl 3'] as const,
      trainingBrief:
        'Sikt mot {volLo}–{volHi} km per uke de siste tre månedene. Nedtrapping fra uke {week} (mandagsuken som starter {date}).',
      paceHint: '{pace}/km eller raskere',
      splitJevn: 'Jevn split (lik innsats første og andre halvdel).',
      splitNamed: '{name} split (σ {sigma} %).',
      drinkOn: 'Drikkestopp: {sec} s per stasjon ({total} s totalt).',
      drinkOff: 'Drikkestopp: av (modellen legger {total} s totalt).',
      startLine: 'Start Bryggen: {time} (lørdag 24. april 2027)',
      distKmHalf: '21,1 km',
      distKmFull: '42,2 km',
    },
    common: {
      half: 'Halvmaraton',
      full: 'Maraton',
      marathon: 'Maraton',
      halfMarathon: 'Halvmaraton',
      loading: 'Laster…',
      officialSite: 'Offisiell side:',
      bcmUrl: 'bergencitymarathon.no',
    },
    split: {
      negativ: 'Negativ',
      positiv: 'Positiv',
      jevn: 'Jevn',
    },
  },
  en: {
    brand: 'BCM race guide',
    nav: {
      mainMenu: 'Main menu',
      home: 'Home',
      loypeguide: 'Course guide',
      hoydeprofil: 'Elevation & map',
      tempoplan: 'Pace plan',
      tempostrategi: 'Pacing strategy',
      praktisk: 'Practical info',
      trening: 'Training',
      om: 'About',
      menu: 'Menu',
    },
    skipLink: 'Skip to content',
    footer: {
      independence:
        'This is an independent runner’s guide. It is not affiliated with TIF Viking, Bergen City Marathon, or the race sponsors. For registration and official information, use bergencitymarathon.no.',
      sources:
        'Course map and schedule sources: bergencitymarathon.no and yr.no / met.no. The pace model is simplified; GPS elevation may differ. The plan is a starting point—your legs on race day have the final say.',
      about: 'About this site',
      contact: 'Contact',
      privacy: 'Privacy',
    },
    hero: {
      kicker: 'Bergen City Marathon 2027 · independent guide',
      h1: 'BCM race guide, pace planner & milestones',
      countdown: {
        started: 'The race has started',
        untilHalf: 'Countdown to start at 09:00',
        untilFull: 'Countdown to start at 07:45',
        units: {
          days: 'Days',
          hours: 'Hours',
          minutes: 'Minutes',
          seconds: 'Seconds',
          hundredths: 'Hundredths',
        },
      },
      course: {
        loading: 'Loading course…',
        ok: 'GPX loaded · exact route',
        warn: 'Elevation estimated',
      },
      stepsAria: 'How to use the tool',
      steps: [
        'Choose distance (full or half)',
        'Target finish time',
        'Recommended race plan',
        'Suggested training milestones in the last 90 days',
        'Summary',
      ] as const,
      stepsShort: ['Distance', 'Time', 'Plan', 'Milestones', 'Summary'] as const,
      stepAction: 'Tap here',
      trykk: 'Tap to open',
      stepAria: 'Step {n}: {text}. Tap to open.',
      sparkAria: 'Elevation profile from Bryggen to the finish',
      places: ['Bryggen', 'Gamle Bergen', 'Fjellveien', 'Lungegårdsvann', 'Nordnes', 'Bryggen'] as const,
    },
    tabBar: {
      tablist: 'Tabs',
      profil: 'Elevation profile',
      band: 'Wristband card',
    },
    stepContinue: {
      nextStep: 'Next step',
      aria: 'Next step {n}: {label}',
    },
    distance: {
      title: 'Choose distance',
      intro: 'Pick half marathon or marathon. Finish time, plan, and training follow your choice.',
      half: 'Half marathon',
      full: 'Marathon',
      aria: 'Distance',
    },
    splits: {
      chartExpand: 'Open race plan chart in fullscreen landscape',
      chartExpandHint: 'Tap for fullscreen',
      chartFullscreenTitle: 'Target pace along the course',
      closeFullscreen: 'Close',
    },
    tempoPlan: {
      loading: 'Loading pace plan…',
      h2: 'Target finish time',
      intro: 'Even effort on the hills—everything updates as you change settings and is saved on your device.',
      labels: {
        split: 'Split strategy',
        hill: 'Hill strategy',
        drink: 'Aid stations',
        flatP0: 'Flat pace p₀',
        summaryTitle: 'How the plan is calculated',
        help: 'Elevation from the GPX file, smoothed over 50 m. If the file is missing, a fallback profile is used.',
      },
    },
    oppsummering: {
      loading: 'Loading summary…',
      h2: 'Summary',
      intro: 'A quick overview of your plan—ready to save, copy, or share.',
      dl: {
        distance: 'Distance',
        targetTime: 'Target finish time',
        avgFlat: 'Average / flat pace',
        finishPlan: 'Finish (plan)',
      },
      strategy: {
        h3: 'Strategy',
        split: 'Split:',
        hills: 'Hills:',
        drink: 'Drinks:',
        course: 'Course:',
        courseNote:
          'Even effort on the climbs—the plan assumes you can be behind average pace heading up toward Fjellveien.',
        drinkOn: '{stopSec} s per stop ({totalSec} s total)',
        drinkOff: 'Off ({totalSec} s modeled)',
      },
      milestones: {
        h3: 'Training milestones',
        daysBefore: '({days} days before race day)',
        calendar: 'Calendar (.ics)',
      },
      training: {
        h3: 'Training',
      },
      armband: {
        h3: 'Wristband card',
        help: 'Split times and clock times at key places—print and strap to your arm.',
      },
      export: {
        h3: 'Full plan as text',
        help: 'If you want to save the plan for later.',
        textareaAria: 'Summary as text',
        copyPlan: 'Copy plan',
        downloadTxt: 'Download .txt',
        planCopied: 'Plan copied',
      },
      facebook: {
        h3: 'Share on Facebook',
        help: 'Short version with a headline and link to the organiser.',
        textareaAria: 'Text for social media',
        copyPost: 'Copy post',
        downloadTxt: 'Download .txt',
        postCopied: 'Facebook text copied',
      },
      copyFailed: 'Could not copy—try download instead.',
    },
    armband: {
      print: 'Print wristband',
    },
    hoydeprofil: {
      kicker: 'Course',
      h1: 'Elevation profile & map',
      intro:
        'The chart shows climbing along the BCM course from Bryggen. Almost all the gain sits between km 3 and 8 toward Fjellveien. Hover the profile to see the point on the map below.',
      help:
        'Heights from GPX when the file is loaded; otherwise a fallback profile is used. The marathon is two laps of the half-marathon route. If you set a target time on the home page, planned time and pace appear on the profile.',
    },
    contact: {
      kicker: 'BCM 2027',
      h1: 'Contact',
      intro:
        'Send a question about the course, pace plan, or this site. Your message opens in your email app, addressed and ready to send.',
      name: 'Name',
      email: 'Email',
      question: 'Question',
      emailError: 'Enter an email address we can reply to.',
      questionError: 'Write your question—at least a few words.',
      submit: 'Send question',
      sent: 'The email is ready in your mail app. Hit send there and it goes to {email}.',
      mailtoSubject: 'Question about the BCM race guide',
      mailtoNameLine: 'Name: {name}',
      mailtoEmailLine: 'Email: {email}',
      nameNotGiven: '(not provided)',
    },
    notFound: {
      h1: 'Page not found',
      intro: 'The link may be outdated, or the address may be wrong. Use the menu above, or go back to the home page.',
      home: 'Back to home',
    },
    homeIntro: {
      h2s: ['More about the guide', 'Articles & deep dives'] as const,
      paragraphs: [
        'This site is for runners tackling the half marathon or marathon in Bergen who want to understand the course before the gun goes off. The tool above follows four steps: choose distance, set a target time, read the race plan, and check milestones in the last ninety days. Everything is stored locally in your browser—no account.',
        'Bergen City Marathon is a city loop that starts and finishes at Bryggen. Marathoners run two laps; half-marathoners one. What sets this guide apart from a generic race magazine is that it is built around the actual route: elevation from GPS tracks, aid stations where they really are, and a pacing model that lets you be “behind the clock” on the climbs without panicking.',
        'Many arrive at BCM with a target from flat terrain. It is easy to underestimate what Fjellveien and the cobbles downtown cost. The guide shows not only where it goes up and down, but what that means for pacing: even effort on climbs is not the same as even kilometre pace. The calculator turns your finish time into flat pace, segment times, and clock times at familiar spots, so you can write a wristband card that survives race day.',
        'The content is written analytically, not copied from the organiser’s site. Where I lack my own photos or personal notes from specific sections, that is marked in the text—on purpose, so the site can grow with your notes and pictures over time. Facts such as start times, cut-offs, and schedule can change; always check bergencitymarathon.no for registration and official updates.',
      ] as const,
      linkBlurbs: {
        loypeguide: 'Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nygårdsparken, and Nordnes.',
        hoydeprofil: 'interactive chart and map of the course.',
        tempoplan: 'how the home-page calculator thinks about pacing.',
        tempostrategi: 'how to distribute effort on a hilly city course.',
        praktisk: 'bag drop, transport, hotels, and gear.',
        trening: 'the last twelve weeks and hill work toward Fjellveien.',
      },
      pull:
        'Almost all noticeable climbing on the lap sits between the sea at Sandviken and the top of Fjellveien. The rest of the guide can be read as a commentary on that sentence.',
      closing:
        'If you have run the loop before, your own story is worth more than any table. Add it where the marker stands, and the site becomes yours as much as it is generic.',
    },
    meta: {
      '/': {
        title: 'Bergen City Marathon 2027 – independent course guide',
        description:
          'Independent guide to the Bergen course: pace plan, segments, training, and practical info for half marathon and marathon. Not affiliated with the organiser.',
      },
      '/loypeguide': {
        title: 'Course guide – Bergen City Marathon 2027',
        description:
          'The course section by section: Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nygårdsparken, and Nordnes—with tactics and surface notes.',
      },
      '/hoydeprofil': {
        title: 'Elevation profile & map – Bergen City Marathon 2027',
        description:
          'Interactive elevation profile and map of the BCM course: climbing toward Fjellveien, segments, and aid stations.',
      },
      '/tempoplan': {
        title: 'Pace plan & calculator – Bergen City Marathon',
        description:
          'Calculate even effort on a hilly city course: target time, split strategy, hills, and aid stops tailored to the BCM route.',
      },
      '/tempostrategi': {
        title: 'Pacing strategy on a hilly half marathon and marathon',
        description:
          'How to distribute effort on climbs and descents at Bergen City Marathon—without chasing the clock up Fjellveien.',
      },
      '/praktisk': {
        title: 'Practical before race day – Bergen City Marathon',
        description:
          'Start and finish, bag drop, transport to Bryggen, accommodation, and what to carry in your pack.',
      },
      '/trening': {
        title: 'Training for Bergen City Marathon 2027',
        description:
          'The final twelve weeks of build-up, hill training toward Fjellveien, and fitness tied to your target time.',
      },
      '/om': {
        title: 'About this race guide',
        description:
          'Who runs the site, why it exists, and that it is independent of TIF Viking and Bergen City Marathon.',
      },
      '/kontakt': {
        title: 'Contact',
        description: 'Send questions about the course, pace plan, or this website.',
      },
      '/personvern': {
        title: 'Privacy policy',
        description: 'Cookies, Google AdSense, local storage, and your rights.',
      },
    },
    summaryExport: {
      header: 'BCM 2027 – my race plan',
      tempoSection: 'Pace & strategy',
      planSection: 'Race plan in brief',
      planNote:
        'The plan uses even effort on the hills—you should be behind even average pace toward Fjellveien, not chasing the watch there.',
      halfway: 'Halfway',
      finish: 'Finish',
      milestonesSection: 'Recommended test milestones (last 90 days)',
      trainingSection: 'Training',
      official: 'Official info & registration:',
      generated: 'Generated with the BCM race guide.',
      fbTitle: 'My plan for BCM 2027!',
      fbTests: 'Test milestones:',
      milestoneTitles: ['Milestone 1', 'Milestone 2', 'Milestone 3'] as const,
      trainingBrief:
        'Aim for {volLo}–{volHi} km per week in the last three months. Taper from week {week} (Monday week starting {date}).',
      paceHint: '{pace}/km or faster',
      splitJevn: 'Even split (same effort in the first and second half).',
      splitNamed: '{name} split (σ {sigma} %).',
      drinkOn: 'Aid stops: {sec} s per station ({total} s total).',
      drinkOff: 'Aid stops: off (model adds {total} s total).',
      startLine: 'Start Bryggen: {time} (Saturday 24 April 2027)',
      distKmHalf: '21.1 km',
      distKmFull: '42.2 km',
    },
    common: {
      half: 'Half marathon',
      full: 'Marathon',
      marathon: 'Marathon',
      halfMarathon: 'Half marathon',
      loading: 'Loading…',
      officialSite: 'Official site:',
      bcmUrl: 'bergencitymarathon.no',
    },
    split: {
      negativ: 'Negative',
      positiv: 'Positive',
      jevn: 'Even',
    },
  },
} as const;

export type UiCopy = (typeof ui)['nb'];
