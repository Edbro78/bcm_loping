# TODO-ED – bergencitymarathon.com

## Fakta som må verifiseres

- [ ] Startcorridor og nøyaktig startoppsett for BCM 2027 (Bryggen)
- [ ] Program, garderobe, expo, tøyoppbevaring og klokkeslett når 2027-programmet publiseres (`/praktisk`, milepæler)
- [ ] Anbefalt ankomstpunkt / kollektivruter løpsdagen 2027
- [ ] Kilometerposisjon for mest vindutsatte partier langs Store Lungegårdsvann (maraton andre runde)

## Egne erfaringer og bilder (plassholdere i kode)

- [ ] Forside: egen erfaring fra BCM eller generalprøve på halve runden
- [ ] Løypeguide: Gamle Bergen-passering (publikum, smal gate)
- [ ] Løypeguide: Fjellveien (gange vs løp, underlag, bilder)
- [ ] Tempostrategi: egen erfaring negativ split vs jevn på kupert maraton
- [ ] Trening: egen ukeplan / treningslogg
- [ ] Praktisk: egne hotell- og frokostanbefalinger
- [ ] Om: navn, kort bio og behandlingsansvarlig

## AdSense og annonser

- [x] `public/ads.txt` synket med `ca-pub-7828159998054709` i kode (oppdater `VITE_ADSENSE_CLIENT` ved bytte konto)
- [ ] Erstatt `data-ad-slot`-plassholdere (`0000000001` …) i `AdSlot`-komponenter med ekte annonseenhets-IDer
- [ ] Sett opp Googles sertifiserte CMP under «Privacy & messaging» i AdSense (ingen eget cookie-banner på siden)

## SEO etter deploy

- [ ] Verifiser domenet i Google Search Console
- [ ] Send inn `https://bergencitymarathon.com/sitemap.xml`
- [ ] Kjør «URL-inspeksjon» på forsiden og `/loypeguide` etter deploy

## Teknisk sjekk

- [ ] Bekreft at `curl` mot produksjon viser mange `<p` per rute (se build-/deploy-notat i chat)
- [ ] Test 404: ukjent URL skal returnere `404.html`, ikke forsiden med 200
