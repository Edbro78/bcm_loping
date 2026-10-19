# Løypeguide og tempoplan · BCM 2027

Enkeltside for Fjordkraft Bergen City Marathon, lørdag 24. april 2027. Løypa tegnes fra GPX-fila, og tempoplanen regnes fra høydeprofilen. Kartfliser ligger lokalt. Ingen API-nøkler.

Farger, skrift (Archivo) og former følger `design.bcm.md`. Milepæltabellen følger `milepæler fra deep r.txt` (VDOT og Riegel).

## Kom i gang

```bash
npm i
node scripts/download-tiles.mjs
npm run dev
```

Flis-scriptet hopper over filer som allerede finnes. Det henter gråkartet, flyfoto og terreng for Bergen og skriver dem til `public/tiles`.

## Bytt løype

Legg en ny GPX av samme runde i `public/data/bcm-course.gpx`, eller endre `GPX_URL` i `src/config.ts`. Appen skalerer sporet til 21,097 km. Du kan også laste en fil i nettleseren med «Last inn GPX-fil».

Dekker den nye løypa et annet område, oppdater `TB` og `TW` i `src/config.ts` og kjør flis-scriptet på nytt.

## Tester

```bash
npm test
```
