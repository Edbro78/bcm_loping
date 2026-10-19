# DESIGN.md — Bergen City Marathon

Designspesifikasjon for en ny versjon av bergencitymarathon.no. Dokumentet bygger på innholdet og strukturen på dagens nettsted (forsiden, «Velkommen 2027» og «Distanser & løype», hentet 28. september 2026) og definerer et komplett designsystem: merkevare, tokens, typografi, layout, komponenter, sidemaler, bevegelse, tilgjengelighet og innhold.

> **Om fargeverdier:** Dagens side kjører WordPress med Enfold-temaet, og logo og CSS kunne ikke leses maskinelt. Paletten under er derfor et forslag forankret i Bergen og løpets identitet, ikke en avlesning av eksisterende merkevarefarger. Før implementering: hent de faktiske verdiene fra `BCM_logo_web` og temaets stilark, og juster `--brand-*`-tokenene hvis logoen har egne farger som må beholdes.

---

## 0. Innhold

1. Kilde og kartlegging av dagens side
2. Merkevare, posisjon og tone
3. Informasjonsarkitektur
4. Designprinsipper
5. Farger
6. Typografi
7. Grid, spacing og breakpoints
8. Former, flater og dybde
9. Ikonografi, foto og grafikk
10. Komponenter
11. Sidemaler
12. Bevegelse
13. Tilgjengelighet
14. Språk og innhold
15. Teknisk implementasjon og tokens
16. Kjente feil på dagens side som løses
17. Sjekkliste før lansering

---

## 1. Kilde og kartlegging av dagens side

### 1.1 Fakta om arrangementet (fra nettstedet)

| Felt | Verdi |
|---|---|
| Fullt navn | Fjordkraft Bergen City Marathon (FBCM), i daglig tale BCM |
| Slagord | «Vårens vakreste eventyr» |
| Neste løp | Lørdag 24. april 2027 |
| Utgave | 15. utgave |
| Start/mål | Bryggen |
| Løypens kjennetegn | Gamle Bergen, Fjellveien med utsikt, gangveien rundt Store Lungegårdsvann, gatene på Nordnes, forbi Nordnesparken, tilbake til Bryggen |
| Distanser | Sport 1 Marathon 42 km · Jæger halvmarathon 21 km · BT-Stafetten · Oris Dental 5 km · Vestkanten barneløp 2 km |
| Tilleggsarrangement | Bergen City Milen |
| Aktiviteter | Fellestreninger, ambassadører, utlandstur «På tur med BCM» (TIF Viking og Timeout Travel) |
| Påmelding | Onreg (ekstern) |
| Resultater | live.ultimate.dk (ekstern) |
| Bilder | marathonphotos.live (ekstern) |
| Løypedata | GPX-fil (`BCM-2025.gpx`), løypekart som bilde, høydeprofil med OpenStreetMap |
| Språk | Norsk bokmål og engelsk (WPML) |
| Kontakt | post@bergencitymarathon.no, Facebook, Instagram |

### 1.2 Dagens navigasjon

Toppnivå: Logg inn (Deltakerlogin, Laglederlogin) · BCM 2027 · Resultater · Bilder · Bergen City Milen · Våre sponsorer · Søk · Språkvalg · Påmelding 2027 (egen knapp).

### 1.3 Dagens forside, ovenfra og ned

1. Logo og hovedmeny
2. Stort bakgrunnsbilde med H1 «BERGEN CITY MARATHON»
3. Tre knapper: «BILDER MARATHON PHOTOS», «DISTANSER & LØYPEKART», «RESULTATER 2026»
4. Sponsorvegg med 22 logoer i én flat liste
5. Footer med Facebook, Instagram, e-post og Om oss

### 1.4 Diagnose

Forsiden svarer ikke på de tre spørsmålene nesten alle besøkende har: *Når er løpet? Hvilken distanse passer meg? Hvordan melder jeg meg på?* Datoen står bare på undersiden «Velkommen 2027». Påmeldingen er en liten menyknapp. Løypen — det mest særegne ved løpet — er gjemt bak en knapp og vises som et statisk bilde. Sponsorveggen tar mer plass enn løpet selv. Designet under snur denne rekkefølgen.

---

## 2. Merkevare, posisjon og tone

### 2.1 Posisjon

BCM er et bymaraton der byen er hovedpersonen. Løypen går fra Hanseatenes brygge via fjellsiden til fjorden på Nordnes; utsikten fra Fjellveien og stemningen på Bryggen er produktet. Det skiller BCM fra flate, raske storbymaraton. Designet skal selge *opplevelsen av Bergen i løpesko*, ikke tidsjakt.

### 2.2 Målgrupper og hva de trenger

| Gruppe | Hovedbehov | Primær inngang |
|---|---|---|
| Førstegangsløper (5 km/halv) | Tør jeg? Hva koster det? Hva skjer på dagen? | Distansevelger, praktisk info |
| Erfaren maratonløper | Løypeprofil, høydemeter, tidsbegrensning, drikkestasjoner, GPX | Løypeside, høydeprofil |
| Stafettlag / bedriftslag | Lagregler, etapper, laglederlogin | BT-Stafetten, laglederlogin |
| Foreldre | Barneløp, alder, trygghet | Vestkanten barneløp |
| Tilbakevendende deltaker | Resultater, bilder, påmelding neste år | Resultater, Bilder |
| Tilskuer | Hvor står jeg, når passerer løperne | Tilskuerkart |
| Sponsor / partner | Synlighet, kontakt | Sponsorside |
| Internasjonal løper | Engelsk, reise, overnatting | Engelsk versjon |

### 2.3 Tone

Varm, direkte, lokal. Skriv som en løpeklubb i Bergen, ikke som et byrå. Korte setninger, aktive verb, konkrete steder. Humor om regn er lov én gang per side, ikke mer.

- Gjør: «Start og mål på Bryggen. Imellom: Fjellveien, Lungegårdsvannet og Nordnes.»
- Unngå: «En uforglemmelig opplevelse i verdensklasse som vil gi deg minner for livet.»

---

## 3. Informasjonsarkitektur

### 3.1 Ny sidestruktur

```
/
├── /bcm-2027/                 Om årets løp (dato, program, praktisk)
│   ├── /program/              Tidsskjema for løpsdagen
│   ├── /praktisk/             Startnummer, bag drop, garderobe, transport
│   ├── /klasser/              Klasseinndeling (flyttet fra Velkommen)
│   └── /regler/               Konkurranseregler, tidsbegrensning
├── /distanser/                Oversikt + velger
│   ├── /maraton/              Sport 1 Marathon 42 km
│   ├── /halvmaraton/          Jæger halvmarathon 21 km
│   ├── /stafett/              BT-Stafetten
│   ├── /5-km/                 Oris Dental 5 km
│   └── /barnelop/             Vestkanten barneløp 2 km
├── /loypen/                   Interaktivt kart, høydeprofil, GPX, tilskuerpunkter
├── /trening/                  Fellestreninger, ambassadører, treningsprogram
├── /resultater/               Lenker per år + live-resultater
├── /bilder/                   Galleri + marathonphotos
├── /bergen-city-milen/        Eget underarrangement
├── /reise/                    «På tur med BCM»
├── /sponsorer/
├── /om-oss/
└── /en/…                      Speilet struktur på engelsk
```

Slugs uten årstall. Dagens `/loypekart-2023/` og `/en/welcome-2023/` får 301-omdirigering.

### 3.2 Primærnavigasjon

Maks fem punkter pluss handling: **Distanser · Løypen · Løpsdagen · Resultater · Trening** + knappen **Meld deg på**. Sekundært (i «Mer»-meny eller footer): Bilder, Bergen City Milen, Reise, Sponsorer, Om oss. Innlogging (deltaker/lagleder) og språk ligger i en smal verktøylinje over hovednavigasjonen på desktop og nederst i mobilmenyen.

### 3.3 Sesongmodus

Nettstedet har tre tilstander gjennom året, styrt av én innstilling i CMS:

| Modus | Periode (typisk) | Forsidens hovedhandling |
|---|---|---|
| **Påmelding åpen** | Høst → april | «Meld deg på» + nedtelling til løpsdagen |
| **Løpsuke / løpsdag** | Siste 7 dager | Program, praktisk info, live-resultater, tilskuerkart |
| **Etter løpet** | Løpsdag + 6 uker | Resultater, bilder, «Takk for i år», påmelding neste år når åpen |

---

## 4. Designprinsipper

1. **Løypen er signaturen.** Høydeprofilen fra GPX-filen er nettstedets gjennomgående grafiske element — i hero, som seksjonsdeler og som navigasjon på løypesiden. Den brukes med vilje, ikke som pynt.
2. **Dato, distanse, påmelding — i den rekkefølgen, over bretten.** Alt annet kommer etterpå.
3. **Byen, ikke løperen, er i fokus i fotografiet.** Løpere i bybildet — Bryggen, Fjellveien, fjorden — framfor nærbilder av ansikter ved målgang.
4. **Bergensfarger, ikke sportsfarger.** Paletten hentes fra Bryggens fasader, fjorden og fjellet, ikke neon og gradienter.
5. **Sponsorer får verdighet, ikke dominans.** Tittelsponsor og distansesponsorer er integrert i navnene; resten samles i en rolig, gruppert vegg nederst.
6. **Mobil først, i regnvær.** Mange åpner siden på løpsdagen med kalde fingre. Store trykkflater, høy kontrast, korte veier til program og resultater.

---

## 5. Farger

### 5.1 Grunnpalett

| Token | Navn | Hex | Opphav | Bruk |
|---|---|---|---|---|
| `--c-fjord` | Fjordnatt | `#12304A` | Byfjorden en aprilkveld | Primær tekst, mørke flater, footer |
| `--c-brygge` | Bryggerød | `#B3322A` | De røde fasadene på Bryggen | Primærhandling (påmelding), aktive tilstander |
| `--c-oker` | Okerhus | `#E2A63A` | De gule/okerfasadene på Bryggen | Sekundær aksent, markering i høydeprofil, badges |
| `--c-regn` | Regnlys | `#E9EEF0` | Lyset gjennom skyene | Seksjonsbakgrunn, kort |
| `--c-fjell` | Fjellgrønn | `#3D6A4E` | Fløyen og Fjellveien | Løype, natur, «vellykket»-tilstand |
| `--c-kalk` | Kalk | `#FFFFFF` | Hvitmalte trehus | Hovedbakgrunn |

### 5.2 Toner (utledet)

| Token | Hex | Bruk |
|---|---|---|
| `--c-fjord-900` | `#0C2236` | Mørk modus bakgrunn |
| `--c-fjord-700` | `#12304A` | = fjord |
| `--c-fjord-500` | `#2F5573` | Sekundær tekst på lys bakgrunn |
| `--c-fjord-300` | `#8AA3B8` | Rammer, inaktive ikoner |
| `--c-fjord-100` | `#D5DFE7` | Skillelinjer |
| `--c-brygge-700` | `#8E2520` | Hover/pressed på primærknapp |
| `--c-brygge-500` | `#B3322A` | = brygge |
| `--c-brygge-100` | `#F6DEDB` | Feilmelding-bakgrunn |
| `--c-oker-700` | `#9A6A12` | Oker som tekst (kontrastsikker) |
| `--c-oker-500` | `#E2A63A` | = oker |
| `--c-oker-100` | `#FBEFD6` | Info-/varselbakgrunn |
| `--c-fjell-700` | `#2A4C37` | Grønn tekst |
| `--c-fjell-100` | `#DDEBE1` | Suksessbakgrunn |

### 5.3 Semantiske tokens

| Token | Lys modus | Mørk modus |
|---|---|---|
| `--bg` | `#FFFFFF` | `#0C2236` |
| `--bg-subtle` | `#E9EEF0` | `#12304A` |
| `--bg-inverse` | `#12304A` | `#E9EEF0` |
| `--text` | `#12304A` | `#E9EEF0` |
| `--text-muted` | `#2F5573` | `#8AA3B8` |
| `--text-inverse` | `#FFFFFF` | `#0C2236` |
| `--border` | `#D5DFE7` | `#2F5573` |
| `--action` | `#B3322A` | `#E0564C` |
| `--action-hover` | `#8E2520` | `#EB7A71` |
| `--action-text` | `#FFFFFF` | `#0C2236` |
| `--accent` | `#E2A63A` | `#E2A63A` |
| `--course` | `#3D6A4E` | `#7FB08F` |
| `--focus` | `#E2A63A` | `#E2A63A` |

### 5.4 Kontrastregler

- Hvit tekst på `#B3322A`: ca. 5,9:1 — godkjent for all tekst.
- `#12304A` på `#FFFFFF`: ca. 13:1. På `#E9EEF0`: ca. 11:1.
- `#2F5573` på hvit: ca. 7,6:1 — godkjent for brødtekst.
- **Oker `#E2A63A` er aldri tekstfarge på lys bakgrunn** (ca. 2:1). Den brukes som flate, strek og markør. Trengs oker tekst, bruk `#9A6A12`.
- Oker som flate med `#12304A`-tekst: ca. 6,5:1 — godkjent.
- Alle verdier verifiseres med verktøy før lansering; tallene over er beregnet, ikke målt i nettleser.

### 5.5 Distansefarger

Hver distanse får en fast farge som brukes i velger, løypekart, resultatlister og startnummer-grafikk. Fargene er valgt for å være skillbare også ved rød-grønn fargeblindhet, og de står aldri alene som eneste informasjonsbærer (alltid med navn/km).

| Distanse | Token | Hex |
|---|---|---|
| Maraton 42 km | `--d-maraton` | `#12304A` (fjord) |
| Halvmaraton 21 km | `--d-halv` | `#B3322A` (brygge) |
| Stafett | `--d-stafett` | `#6B4C9A` |
| 5 km | `--d-5km` | `#E2A63A` (oker) |
| Barneløp 2 km | `--d-barn` | `#2E8FA3` |

---

## 6. Typografi

### 6.1 Skrifter

**Én familie: Archivo (variabel, Google Fonts), med bredde-aksen aktivt i bruk.**

- Display: Archivo, `wdth` 62–75 (smal), vekt 800–900. Den smale bredden gir tall og stedsnavn sportslig tyngde uten å låne en typisk «sportsskrift».
- Brødtekst og UI: Archivo, `wdth` 100, vekt 400/500/600.
- Tall (tider, distanser, datoer, resultater): `font-variant-numeric: tabular-nums lining-nums`.
- Fallback: `"Archivo", "Helvetica Neue", Arial, system-ui, sans-serif`.

Begrunnelse: én familie med variabel bredde gir kontrast mellom overskrift og brødtekst uten to konkurrerende stemmer, og støtter æ, ø, å fullt ut.

### 6.2 Skala (modulær, ratio 1,25, base 18 px)

| Token | px (desktop) | px (mobil) | Linjehøyde | Vekt | Bredde | Bruk |
|---|---|---|---|---|---|---|
| `--fs-hero` | 112 | 56 | 0,92 | 900 | 62 | Datoen i hero |
| `--fs-display` | 72 | 44 | 0,95 | 850 | 68 | Sidetitler |
| `--fs-h1` | 48 | 34 | 1,05 | 800 | 75 | H1 på undersider |
| `--fs-h2` | 36 | 28 | 1,1 | 750 | 85 | Seksjonstitler |
| `--fs-h3` | 26 | 22 | 1,2 | 700 | 100 | Korttitler |
| `--fs-h4` | 21 | 19 | 1,3 | 650 | 100 | Mellomtitler |
| `--fs-body-l` | 21 | 19 | 1,55 | 400 | 100 | Ingress |
| `--fs-body` | 18 | 17 | 1,6 | 400 | 100 | Brødtekst |
| `--fs-small` | 15 | 15 | 1,5 | 500 | 100 | Metadata, bildetekst |
| `--fs-micro` | 13 | 13 | 1,4 | 600 | 100 | Km-markører i profil, juridisk |

Bruk `clamp()` mellom mobil- og desktopverdi (se §15).

### 6.3 Regler

- Setningsstil i overskrifter og knapper: «Meld deg på», ikke «MELD DEG PÅ». Dagens gjennomgående store bokstaver fjernes.
- Ingen etikett-overskrift over hver seksjon. Overskriften sier det den skal.
- Maks linjelengde 68 tegn for brødtekst (`max-width: 38rem`).
- Ett ord uthevet i farge inne i en overskrift er ikke lov.
- Datoformat: «lørdag 24. april 2027». Klokkeslett: «09.00». Tider: «3:12:45». Distanse: «42,2 km» (komma, mellomrom før enhet, `&nbsp;`).
- Orddeling på for norsk: `hyphens: auto; lang="nb"`.

---

## 7. Grid, spacing og breakpoints

### 7.1 Spacing (4 px-base)

| Token | Verdi |
|---|---|
| `--s-1` | 4 px |
| `--s-2` | 8 px |
| `--s-3` | 12 px |
| `--s-4` | 16 px |
| `--s-5` | 24 px |
| `--s-6` | 32 px |
| `--s-7` | 48 px |
| `--s-8` | 64 px |
| `--s-9` | 96 px |
| `--s-10` | 128 px |

Seksjonsavstand: `--s-9` desktop, `--s-8` mobil. Avstand mellom overskrift og innhold: `--s-5`.

### 7.2 Breakpoints

| Navn | Min-bredde | Kolonner | Marg | Gutter |
|---|---|---|---|---|
| `xs` | 0 | 4 | 20 px | 16 px |
| `sm` | 600 px | 8 | 32 px | 20 px |
| `md` | 900 px | 12 | 40 px | 24 px |
| `lg` | 1200 px | 12 | 56 px | 32 px |
| `xl` | 1520 px | 12 | auto (maks innhold 1400 px) | 32 px |

### 7.3 Layoutbredder

- `--w-text`: 38rem (lesetekst)
- `--w-content`: 72rem (standard innhold)
- `--w-wide`: 87.5rem (kart, gallerier)
- Fullbredde: hero, høydeprofil, løypekart.

### 7.4 Justering

Venstrejustert overalt. Sentrert kun for enkeltlinjer i nedtelling og «Takk for i år»-tilstand. Aldri blokkjustert.

---

## 8. Former, flater og dybde

| Token | Verdi | Bruk |
|---|---|---|
| `--r-0` | 0 | Fullbredde-bilder, profil |
| `--r-1` | 4 px | Input, tags |
| `--r-2` | 10 px | Kort, bilder i innhold |
| `--r-pill` | 999 px | Knapper, distansechips |

Radius følger hierarki: store flater er rette, interaktive elementer runde. Ikke én radius på alt.

Skygger brukes bare på elementer som ligger *over* noe annet (fast header ved scroll, meny, modal, kartpopup):

- `--shadow-float`: `0 8px 24px rgb(18 48 74 / 0.18)`
- `--shadow-menu`: `0 16px 40px rgb(18 48 74 / 0.24)`

Kort ligger flatt på `--bg-subtle` uten skygge. Rammer: `1px solid var(--border)` der kort ligger på samme farge som bakgrunnen.

---

## 9. Ikonografi, foto og grafikk

### 9.1 Høydeprofilen (signaturelement)

- Generert fra `BCM-2025.gpx` (oppdateres per år). Tegnes som SVG-sti med fylt område under.
- Stil: strek 3 px `--c-fjord` (eller hvit på mørk/foto), fyll `--c-fjord` på 12 % opasitet, grunnlinje 1 px.
- Stedsmarkører: små okerfarget prikker (8 px) med stedsnavn i `--fs-micro`, vekt 600: Bryggen, Gamle Bergen, Fjellveien, Store Lungegårdsvann, Nordnes, Nordnesparken, Bryggen (mål).
- Km-markører hver 5. km (maraton) / hver 2. km (halv), tabulære tall.
- Brukes i tre skalaer: **Hero** (full bredde, ca. 120–180 px høy, uten akser), **Seksjonsdeler** (utsnitt, 48 px høy, dekorativ, `aria-hidden`), **Løypesiden** (interaktiv, full detalj med akser, se §10.8).
- Faktiske høydemeter, stigning og km-posisjoner hentes fra GPX-filen; ingen tall skrives inn manuelt.

### 9.2 Fotografi

- Motiv: løpere i bylandskap. Prioritet: Bryggen ved start, Fjellveien med fjordutsikt, Lungegårdsvannet, Nordnes-gatene, publikum.
- Behandling: naturlige farger, lett nedtonet høylys. Ingen fargefilter, ingen duotone.
- Beskjæring: 16:9 hero, 4:3 kort, 3:2 galleri, 1:1 ambassadører.
- Tekst over foto krever gradient-scrim nederst: `linear-gradient(to top, rgb(12 34 54 / .75), transparent 60%)`.
- Formater: AVIF → WebP → JPEG via `<picture>`. `srcset` 480/800/1200/1600/2400. Lazy-loading unntatt hero.
- Alt-tekst beskriver sted og handling: «Løpere på Fjellveien med utsikt over Vågen».

### 9.3 Ikoner

- Bibliotek: Lucide (strek 1,75 px, 24 px grid), eller tilsvarende konsistent strekikonsett.
- Egne ikoner (samme strekvekt): startnummer, stafettpinne, drikkestasjon, toalett, bag drop, tilskuerpunkt, medalje.
- Ikoner står alltid med tekst, unntatt lukk-knapp, søk og sosiale medier (som har `aria-label`).

### 9.4 Logo

- Eksisterende `BCM_logo_web` beholdes. Minimum friområde: høyden av logoens største bokstav på alle sider.
- Minimumsbredde: 120 px desktop header, 96 px mobil.
- Hvit versjon på mørke flater og foto. Skaff SVG-versjon; dagens PNG (1030×480) er for tung og uskarp på retina.

---

## 10. Komponenter

### 10.1 Verktøylinje (desktop ≥ 900 px)

Smal stripe (36 px) over header, `--bg-inverse`, tekst `--fs-small`, hvit. Venstre: «Lørdag 24. april 2027 · Bryggen». Høyre: Deltakerlogin, Laglederlogin, språkvalg (NO / EN som tekst, ikke flagg). Skjules på mobil; innholdet flyttes til bunnen av mobilmenyen.

### 10.2 Header

- Høyde 80 px (desktop), 64 px (mobil). Bakgrunn `--bg`; transparent med hvit logo når den ligger over hero, blir solid med `--shadow-float` etter 80 px scroll.
- Innhold: logo · hovednavigasjon (fem punkter) · søk-ikon · knapp «Meld deg på».
- Aktiv side: 3 px understrek i `--action`, 6 px under teksten.
- Mobil: logo · «Meld deg på» (kompakt) · menyknapp. Påmelding er alltid synlig, også på mobil.

### 10.3 Mobilmeny

Fullskjerm-panel fra høyre, `--bg`. Store lenker (`--fs-h3`, 56 px trykkflate). Rekkefølge: hovedpunkter, skillelinje, sekundærpunkter, skillelinje, innlogging, språk, sosiale medier. Lukkes med Esc, lukk-knapp og swipe. Fokus fanges i panelet.

### 10.4 Knapper

| Variant | Bakgrunn | Tekst | Ramme | Bruk |
|---|---|---|---|---|
| Primær | `--action` | `--action-text` | — | Meld deg på (én per visning) |
| Sekundær | transparent | `--text` | 2 px `--text` | Se løypen, Se resultater |
| På foto | `#FFFFFF` | `--c-fjord` | — | Sekundær over hero-bilde |
| Tekstlenke | — | `--text` | understrek 1 px, 3 px offset | Inline |

- Høyde 52 px (L), 44 px (M), 36 px (S, kun desktop). Padding 0 28 px / 0 20 px / 0 14 px. `--r-pill`. Vekt 650.
- Hover: primær → `--action-hover`; sekundær → fyll `--text`, tekst `--bg`. Overgang 150 ms.
- Fokus: 3 px `--focus` outline, 3 px offset.
- Eksterne lenker (Onreg, ultimate.dk, marathonphotos) får et lite «ut av siden»-ikon etter teksten og `rel="noopener"`.

### 10.5 Hero (forside)

```
┌──────────────────────────────────────────────────────────────┐
│ [header, transparent over foto]                              │
│                                                              │
│   Lørdag                                                     │
│   24. april 2027                    (fs-hero, hvit)          │
│                                                              │
│   Bergen City Marathon — 15. gang.                           │
│   Start og mål på Bryggen.          (fs-body-l)              │
│                                                              │
│   [ Meld deg på ]  [ Se løypen ]                             │
│                                                              │
│  ╱╲    ╱╲╱╲                     ╱╲                           │
│ ╱  ╲__╱    ╲___________________╱  ╲______   (høydeprofil)    │
│ Bryggen  Gamle Bergen  Fjellveien  Lungegårdsv.  Nordnes     │
└──────────────────────────────────────────────────────────────┘
```

- Fullbredde foto (Bryggen eller Fjellveien), min-høyde `min(88svh, 900px)`, mobil `80svh`.
- Datoen er det største elementet; navnet på løpet ligger i logo og ingress. Løpsnavnet er likevel H1 (visuelt i `--fs-body-l`-tyngde, se §13) — datoen er `<p>` med stor stil. Alternativ: H1 = «Bergen City Marathon, lørdag 24. april 2027» med datoen visuelt fremhevet via `<span>`.
- Høydeprofilen ligger i bunnkanten, hvit strek, stedsnavn under. Den er klikkbar og leder til /loypen/.
- I «Etter løpet»-modus byttes dato til «Takk for i år» og knappene til «Se resultater» / «Finn bildene dine».

### 10.6 Nedtelling

Plassert rett under hero (stripe, `--bg-subtle`). «Dager igjen: 208» i `--fs-h2` tabulære tall + neste frist: «Prisøkning 1. januar» (hentes fra CMS). Oppdateres én gang per døgn, ingen sekundteller. Skjules når det ikke finnes en kommende frist.

### 10.7 Distansevelger

Den viktigste komponenten etter hero. Fem kort i horisontal rad (desktop), horisontal scroll med snap (mobil).

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│▌42,2 km     │ │▌21,1 km     │ │▌Stafett     │ │▌5 km        │ │▌2 km        │
│ Maraton     │ │ Halvmaraton │ │ Lag på 4    │ │ For alle    │ │ Barneløp    │
│ Sport 1     │ │ Jæger       │ │ BT          │ │ Oris Dental │ │ Vestkanten  │
│             │ │             │ │             │ │             │ │             │
│ Fra 18 år   │ │ Fra 16 år   │ │ Dame/herre/ │ │ Fra 10 år   │ │ 0–12 år     │
│ Start 09.00 │ │ Start —     │ │ mix         │ │             │ │             │
│ Les mer     │ │ Les mer     │ │ Les mer     │ │ Les mer     │ │ Les mer     │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

- Venstre kant: 6 px stripe i distansens farge (§5.5).
- Distanse i `--fs-h2` smal bredde, tabulære tall; navn i `--fs-h3`; sponsor i `--fs-small`, `--text-muted`.
- Nøkkelfakta: aldersgrense (fra klasseinndelingen), starttid, tidsbegrensning, pris — felt som ikke er fylt ut i CMS skjules, aldri «TBA».
- Hele kortet er klikkbart (én lenke, `::after`-overlay), hover: bakgrunn `--bg` → `--bg-subtle`, stripe utvides fra 6 til 10 px.
- Over kortene: valgfritt filter «Hvor langt vil du løpe?» — utelates i første versjon.
- Aldersgrenser fra dagens klasseinndeling: maraton yngste klasse 18–19 år, halvmaraton 16–17 år, 5 km 10–11 år, barneløp 0–12 år.

### 10.8 Interaktivt løypekart (løypesiden)

- Kart: MapLibre GL med OpenStreetMap-fliser (attribusjon påkrevd, som i dag). Løypen tegnes fra GPX som linje i distansens farge, 5 px, hvit kontur 2 px.
- Lag som kan slås av/på (chips over kartet): Maraton, Halvmaraton, 5 km, Barneløp, Drikkestasjoner, Toaletter, Tilskuerpunkter, Stafettveksling.
- Koblet høydeprofil under kartet: hover/drag på profilen flytter en markør på kartet og omvendt. Tooltip viser km, høyde og nærmeste sted.
- Km-markører på kartet hver km (små sirkler med tall ved zoom ≥ 14).
- Tastatur: piltaster flytter markøren langs løypen i 0,5 km-steg. Skjermleser: tabell-alternativ med km, sted og høyde under kartet (`<details>` «Løypen som tabell»).
- Nedlastinger: GPX, løypekart som PDF, kalenderfil (.ics) for løpsdagen.
- Statisk bilde (dagens `BCM_Loypekart`) vises som fallback uten JavaScript.

### 10.9 Løypefortelling

Scrollende seksjon på /loypen/ og forkortet på forsiden: fem steder med foto, km-intervall og to–tre setninger. Rekkefølgen er faktisk sekvens langs løypen, så nummerering er riktig her.

```
1  Bryggen            km 0         [foto]
2  Gamle Bergen       km x–y       [foto]
3  Fjellveien         km x–y       [foto]
4  Store Lungegårdsv. km x–y       [foto]
5  Nordnes            km x–y       [foto]
```

Km-intervaller hentes fra GPX. Den faste høydeprofilen til venstre (desktop) markerer aktivt avsnitt ved scroll.

### 10.10 Klasseinndeling

Dagens lange tekstblokk erstattes av faner per distanse (Maraton / Halvmaraton / 5 km / Stafett / Barneløp) med en enkel liste av aldersklasser. Kun tekst, ingen tabell nødvendig. Faner er `role="tablist"`, piltastnavigasjon.

### 10.11 Programliste (løpsdagen)

Tidslinje, vertikal. Klokkeslett i tabulære tall til venstre (`--fs-h4`, 80 px kolonne), hendelse og sted til høyre. Distansefarge som prikk ved start-hendelser. Hendelse som pågår nå (løpsdag): oker bakgrunn `--c-oker-100` og etikett «Nå».

### 10.12 Resultatmodul

- Forside (etter løpet) og /resultater/: søkefelt «Finn resultat — navn eller startnummer» som sender til live.ultimate.dk med riktig event-ID, pluss liste over år med lenker.
- Ikke bygg egen resultatdatabase i første versjon; lenk ut tydelig.

### 10.13 Fellestreninger

Liste med dato (stor dag + måned), sted, tid og tempo-grupper. Neste trening øverst, fremhevet. Tidligere treninger skjules automatisk.

### 10.14 Ambassadørkort

1:1-portrett, navn (`--fs-h4`), distanse-chip, én setning i sitat. Tre per rad desktop, horisontal scroll mobil. Ingen hover-effekter utover fokus.

### 10.15 Sponsorvegg

Dagens flate liste med 22 logoer grupperes i tre nivåer:

| Nivå | Hvem | Visning |
|---|---|---|
| Tittelsponsor | Fjordkraft | Egen linje, logo 200 px bred, én setning |
| Distansesponsorer | Sport 1, Jæger (BMW), BT, Oris Dental, Vestkanten | Rad med 5 logoer, 140 px, koblet til distanse |
| Partnere | Øvrige | Rutenett 6/4/3 kolonner, logo 96 px |

- Alle logoer i monokrom `--text-muted` som standard, full farge på hover/fokus (valgfritt — sjekk sponsoravtaler; noen krever alltid farge).
- Hver logo i en boks med fast høyde (72 px) og `object-fit: contain`, slik at ulike formater (jpg med hvit bakgrunn, png med padding) blir like store visuelt. Be sponsorer om SVG.
- Lenker får `aria-label="[Sponsornavn] (åpnes i ny fane)"`. Logoer uten lenke i dag (Red Bull, XPartner, Skyttel) får lenke eller vises uten lenke konsekvent.

### 10.16 Footer

`--bg-inverse`. Fire kolonner (desktop), stablet (mobil): **Løpet** (dato, sted, adresse), **Snarveier** (distanser, løypen, resultater, bilder), **Kontakt** (e-post, Om oss), **Følg oss** (Facebook, Instagram). Nederst: dekorativ høydeprofil-strek i 1 px `--c-fjord-300` over hele bredden, copyright og personvern. Fjern «powered by Enfold WordPress Theme».

### 10.17 Skjema og input

Brukes for søk og eventuell nyhetsbrevpåmelding. Høyde 52 px, `--r-1`, ramme 1,5 px `--border`, fokus 2 px `--focus` + ramme `--text`. Etikett alltid synlig over feltet. Feilmelding under feltet i `--c-brygge-700` med ikon, forklarer hva som må rettes.

### 10.18 Varselbanner

Øverst over header, fullbredde, for driftsmeldinger (endret løype, vær). Info: `--c-oker-100` / tekst `--c-fjord`. Kritisk: `--c-brygge-500` / hvit tekst. Kan lukkes (husk valget i `localStorage` per meldings-ID).

### 10.19 Tilstander

| Tilstand | Behandling |
|---|---|
| Laster (kart) | Grå flate `--bg-subtle` i kartets størrelse + statisk profil |
| Tom (ingen kommende treninger) | «Neste fellestrening publiseres i januar.» + lenke til Instagram |
| Feil (kart laster ikke) | Statisk løypekart-bilde + GPX-nedlasting |
| Påmelding stengt | Knapp erstattes av tekst: «Påmeldingen til 2027 er stengt. Påmelding til 2028 åpner [dato].» |

---

## 11. Sidemaler

### 11.1 Forside (modus: påmelding åpen)

```
┌ verktøylinje ────────────────────────────────────────────────┐
├ header ──────────────────────────────────────────────────────┤
│ HERO: dato · ingress · Meld deg på / Se løypen · profil     │
├──────────────────────────────────────────────────────────────┤
│ Nedtelling + neste frist                                     │
├──────────────────────────────────────────────────────────────┤
│ Velg distanse  [5 distansekort]                              │
├──────────────────────────────────────────────────────────────┤
│ Løypen: foto venstre | tekst + 5 steder + «Utforsk løypen»   │
├──────────────────────────────────────────────────────────────┤
│ Tren med oss: neste fellestrening | ambassadører            │
├──────────────────────────────────────────────────────────────┤
│ Fra i fjor: resultater 2026 | bilder 2026 (to store lenker)  │
├──────────────────────────────────────────────────────────────┤
│ Bergen City Milen (banner) · På tur med BCM (banner)         │
├──────────────────────────────────────────────────────────────┤
│ Sponsorvegg (3 nivåer)                                       │
├ footer ──────────────────────────────────────────────────────┤
```

### 11.2 Forside (modus: løpsuke)

Hero byttes til «Vi ses på Bryggen lørdag». Under hero: program for dagen (§10.11), praktisk info i fire kort (Startnummer, Bag drop, Transport, Tilskuere), deretter tilskuerkart. Distansevelgeren flyttes ned.

### 11.3 Forside (modus: etter løpet)

Hero: «Takk for i år» + beste løpsbilde. Handlinger: «Finn resultatet ditt» (søkefelt direkte i hero) og «Se bildene». Deretter: dato for neste år og påmeldingsknapp hvis åpen.

### 11.4 Distanseside (mal for alle fem)

1. Topp: distansefarge-stripe (8 px) øverst, H1 «Maraton — 42,2 km», sponsornavn under, knapp «Meld deg på maraton».
2. Nøkkelfakta i rad: Start, Tidsbegrensning, Aldersgrense, Pris, Drikkestasjoner.
3. Høydeprofil for denne distansen (fra GPX), med stedsnavn.
4. Løypebeskrivelse i prosa (maks 250 ord).
5. Klasser for distansen.
6. Praktisk: startgrupper/pacere, tidtaking, medalje.
7. Relaterte: andre distanser (små kort), fellestreninger.

### 11.5 Løypeside

Fullbredde interaktivt kart (§10.8) → koblet høydeprofil → løypefortelling (§10.9) → tilskuerpunkter med anbefalt tid → nedlastinger.

### 11.6 BCM 2027 / Løpsdagen

Ingress om årets løp (dagens tekst, strammet inn), program, praktisk info, klasser (§10.10), regler (lenke), FAQ som `<details>`-liste.

### 11.7 Resultater

Søkefelt (§10.12), live-resultater når aktuelt, liste over år (nyeste først) med lenke til resultater og bilder per år.

### 11.8 Bilder

Lenke til marathonphotos.live (fremhevet: «Finn bildene dine med startnummer»), pluss eget kuratert galleri per år i masonry-rutenett, lysboks med tastaturnavigasjon.

### 11.9 Trening

Fellestreninger (§10.13), ambassadører (§10.14), eventuelle treningsprogram per distanse.

### 11.10 Sponsorer

Tittelsponsor med tekst, distansesponsorer med tekst, partnere i rutenett, kontaktblokk for nye sponsorer.

### 11.11 404

«Denne siden løp videre.» + søkefelt + lenker til distanser, løypen, resultater.

---

## 12. Bevegelse

| Token | Verdi |
|---|---|
| `--t-fast` | 150 ms |
| `--t-base` | 250 ms |
| `--t-slow` | 600 ms |
| `--ease-out` | `cubic-bezier(.2, .7, .2, 1)` |
| `--ease-in-out` | `cubic-bezier(.6, 0, .3, 1)` |

- **Ett orkestrert øyeblikk:** ved første lasting tegnes høydeprofilen i hero fra venstre til høyre (`stroke-dashoffset`, 1 400 ms, `--ease-in-out`), deretter dukker stedsmarkørene opp i sekvens (60 ms mellom hver). Ingenting annet på siden animerer inn.
- Ingen fade-inn av seksjoner ved scroll.
- Brukerutløst bevegelse: meny inn (250 ms), faner (150 ms), kartmarkør følger profil (ingen easing, direkte).
- `prefers-reduced-motion: reduce`: profilen vises ferdig tegnet, alle overganger ≤ 1 ms, kart uten flyTo-animasjon.

---

## 13. Tilgjengelighet

Mål: WCAG 2.2 AA.

- Semantikk: én `<h1>` per side. På forsiden er H1 «Bergen City Marathon» (i dag står det i store bokstaver; skriv det normalt og la CSS styre utseendet).
- `lang="nb"` på norske sider, `lang="en"` på engelske; `hreflang`-par mellom versjonene.
- Hopp-til-innhold-lenke som første fokuserbare element.
- Trykkflater minst 44×44 px; 48 px på mobil for primærhandlinger.
- Synlig fokus på alt interaktivt (§10.4). Ingen `outline: none` uten erstatning.
- Farge er aldri eneste bærer av informasjon (distanser har alltid navn).
- Kart og høydeprofil har tekstalternativ (tabell).
- Språkvalg som tekst («Norsk» / «English»), ikke flagg alene. Dagens flagg-lenker har uoversatte titler.
- Søkeknapp: dagens skjulte tekst «Click to open the search input field» erstattes med `aria-label="Søk"`.
- Eksterne lenker varsler at de åpner nytt nettsted.
- Bilder: meningsfull alt-tekst; sponsorlogoer har sponsornavnet som alt.
- Test med VoiceOver (iOS), TalkBack, NVDA og kun tastatur.

---

## 14. Språk og innhold

### 14.1 Navngiving

| Dagens | Ny |
|---|---|
| PÅMELDING 2027 | Meld deg på |
| BILDER MARATHON PHOTOS | Finn bildene dine |
| DISTANSER & LØYPEKART | Se løypen / Velg distanse |
| RESULTATER 2026 | Resultater 2026 |
| Våre sponsorer | Sponsorer |
| BCM 2027 | Løpsdagen |
| Deltakerlogin / Laglederlogin | Min påmelding / Lagleder |

Samme handling har samme navn hele veien: knappen «Meld deg på» fører til Onreg; bekreftelsen omtales som «påmeldingen din».

### 14.2 Forsidetekst (forslag)

- Hero-ingress: «Bergen City Marathon — 15. gang. Start og mål på Bryggen.»
- Løype-seksjon, overskrift: «Hele Bergen på én runde»
- Løype-seksjon, tekst: «Fra Bryggen via Gamle Bergen og opp til Fjellveien, rundt Store Lungegårdsvann og ut på Nordnes. Utsikten får du med på kjøpet.»
- Trening-seksjon: «Tren med oss før løpet»
- Etter løpet: «Takk for i år. Finn resultatet og bildene dine under.»

### 14.3 Engelsk

Full speiling av struktur og innhold, oppdatert samtidig som norsk. Stedsnavn beholdes på norsk (Bryggen, Fjellveien, Nordnes) med kort forklaring første gang.

---

## 15. Teknisk implementasjon og tokens

### 15.1 CSS-tokens

```css
:root {
  /* Palett */
  --c-fjord: #12304A;
  --c-fjord-900: #0C2236;
  --c-fjord-500: #2F5573;
  --c-fjord-300: #8AA3B8;
  --c-fjord-100: #D5DFE7;
  --c-brygge: #B3322A;
  --c-brygge-700: #8E2520;
  --c-brygge-100: #F6DEDB;
  --c-oker: #E2A63A;
  --c-oker-700: #9A6A12;
  --c-oker-100: #FBEFD6;
  --c-regn: #E9EEF0;
  --c-fjell: #3D6A4E;
  --c-fjell-700: #2A4C37;
  --c-fjell-100: #DDEBE1;
  --c-kalk: #FFFFFF;

  /* Distanser */
  --d-maraton: var(--c-fjord);
  --d-halv: var(--c-brygge);
  --d-stafett: #6B4C9A;
  --d-5km: var(--c-oker);
  --d-barn: #2E8FA3;

  /* Semantikk – lys */
  --bg: var(--c-kalk);
  --bg-subtle: var(--c-regn);
  --bg-inverse: var(--c-fjord);
  --text: var(--c-fjord);
  --text-muted: var(--c-fjord-500);
  --text-inverse: var(--c-kalk);
  --border: var(--c-fjord-100);
  --action: var(--c-brygge);
  --action-hover: var(--c-brygge-700);
  --action-text: var(--c-kalk);
  --accent: var(--c-oker);
  --course: var(--c-fjell);
  --focus: var(--c-oker);

  /* Typografi */
  --font: "Archivo", "Helvetica Neue", Arial, system-ui, sans-serif;
  --fs-hero: clamp(3.5rem, 1.6rem + 8vw, 7rem);
  --fs-display: clamp(2.75rem, 1.7rem + 4.4vw, 4.5rem);
  --fs-h1: clamp(2.125rem, 1.6rem + 2.2vw, 3rem);
  --fs-h2: clamp(1.75rem, 1.45rem + 1.2vw, 2.25rem);
  --fs-h3: clamp(1.375rem, 1.25rem + .5vw, 1.625rem);
  --fs-h4: clamp(1.1875rem, 1.13rem + .25vw, 1.3125rem);
  --fs-body-l: clamp(1.1875rem, 1.13rem + .25vw, 1.3125rem);
  --fs-body: clamp(1.0625rem, 1.04rem + .1vw, 1.125rem);
  --fs-small: .9375rem;
  --fs-micro: .8125rem;

  /* Spacing */
  --s-1: .25rem; --s-2: .5rem; --s-3: .75rem; --s-4: 1rem;
  --s-5: 1.5rem; --s-6: 2rem; --s-7: 3rem; --s-8: 4rem;
  --s-9: 6rem;  --s-10: 8rem;

  /* Bredder */
  --w-text: 38rem;
  --w-content: 72rem;
  --w-wide: 87.5rem;

  /* Former */
  --r-1: 4px; --r-2: 10px; --r-pill: 999px;
  --shadow-float: 0 8px 24px rgb(18 48 74 / .18);
  --shadow-menu: 0 16px 40px rgb(18 48 74 / .24);

  /* Bevegelse */
  --t-fast: 150ms; --t-base: 250ms; --t-slow: 600ms;
  --ease-out: cubic-bezier(.2,.7,.2,1);
  --ease-in-out: cubic-bezier(.6,0,.3,1);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: var(--c-fjord-900);
    --bg-subtle: var(--c-fjord);
    --bg-inverse: var(--c-regn);
    --text: var(--c-regn);
    --text-muted: var(--c-fjord-300);
    --text-inverse: var(--c-fjord-900);
    --border: var(--c-fjord-500);
    --action: #E0564C;
    --action-hover: #EB7A71;
    --action-text: var(--c-fjord-900);
    --course: #7FB08F;
  }
}

h1, h2, .display, .hero-date {
  font-family: var(--font);
  font-variation-settings: "wdth" 68;
  letter-spacing: -0.01em;
}
.num { font-variant-numeric: tabular-nums lining-nums; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}
```

### 15.2 Plattform

- Anbefalt: bytte fra Enfold til et lett blokk-tema (eller headless WordPress + Astro/Next) for ytelse. Beholdes WordPress, bygges komponentene som egne Gutenberg-blokker med tokens over som `theme.json`.
- Flerspråk: WPML beholdes, eller Polylang; krav er `hreflang` og speilede slugs.
- Høydeprofil: GPX parses ved bygg/lagring (ikke i nettleser) til en forenklet JSON (Douglas–Peucker, ~400 punkter), som SVG tegnes fra.
- Kart: MapLibre GL, OSM-fliser via lisensiert leverandør, lastes først når kartet er i viewport.
- Sesongmodus: global innstilling (ACF-felt eller `theme.json`-variabel).

### 15.3 Ytelsesbudsjett (mobil, 4G)

| Mål | Grense |
|---|---|
| LCP | < 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| JS på forsiden | < 80 kB gz (kart lastes kun på løypesiden) |
| Hero-bilde | < 180 kB (AVIF) |
| Fonter | Én variabel fil, subset latin + latin-ext, `font-display: swap`, preload |

---

## 16. Kjente feil på dagens side som løses

1. Datoen for løpet vises ikke på forsiden.
2. Påmelding er liten og lett å overse, særlig på mobil.
3. Gjennomgående store bokstaver i knapper og overskrifter svekker lesbarhet.
4. «Les mer om neste års turer her» på Velkommen-siden har tom lenke.
5. Velkommen 2027-siden omtaler «Fellestreninger 2026» og tur i 2026 — innholdet er ikke oppdatert for 2027.
6. Årstall i URL-er (`/loypekart-2023/`, `/en/welcome-2023/`) og gamle `?page_id=`-lenker.
7. Lenken til marathonphotos bruker http, ikke https.
8. Uoversatt skjermlesertekst på søkeknappen («Click to open the search input field»).
9. Sosiale lenker gjentas flere steder uten hierarki.
10. Sponsorveggen er en flat liste med logoer i ulike formater og størrelser, noen uten lenke.
11. Klasseinndelingen er en lang tekstblokk nederst på en side som handler om noe annet.
12. Løypekartet er et statisk bilde; høydeprofilen er ikke koblet til kartet.
13. PNG-logo i 1030×480 lastes på alle sider.
14. «powered by Enfold WordPress Theme» i footer.

---

## 17. Sjekkliste før lansering

- [ ] Faktiske merkevarefarger hentet fra logo/CSS, `--brand`-tokens justert
- [ ] SVG-logo i farge og hvit
- [ ] GPX for 2027 lagt inn, profil og km-intervaller generert
- [ ] Alle distanser har starttid, tidsbegrensning, pris og aldersgrense i CMS
- [ ] Sesongmodus testet i alle tre tilstander
- [ ] Onreg-lenker oppdatert med riktig event-ID
- [ ] 301-omdirigeringer fra gamle URL-er
- [ ] Engelsk versjon speilet og gjennomlest
- [ ] Kontrast verifisert i nettleser, lys og mørk modus
- [ ] Tastatur- og skjermlesertest på forside, distanseside, løypeside
- [ ] Ytelsesbudsjett målt på ekte mobil
- [ ] Sponsoravtaler sjekket for krav til logofarge og plassering
