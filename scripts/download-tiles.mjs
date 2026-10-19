/**
 * Laster kartfliser én gang til public/tiles.
 * Kjør: node scripts/download-tiles.mjs
 * Hopper over filer som allerede finnes. 12 parallelle nedlastinger.
 */
import fs from 'node:fs';
import path from 'node:path';

const TW = { s: 60.3, n: 60.5, w: 5.1, e: 5.56 };
const TB = { s: 60.366, n: 60.428, w: 5.29, e: 5.38 };
const OUT = path.resolve('public/tiles');
const PARALLEL = 12;

const tx = (lng, z) => Math.floor(((lng + 180) / 360) * 2 ** z);
const ty = (lat, z) => {
  const r = (lat * Math.PI) / 180;
  return Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z);
};

const GRAY = (z, y, x) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/${z}/${y}/${x}`;
const TOPO = (z, y, x) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}`;
const SAT = (z, y, x) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
const DEM = (z, x, y) =>
  `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;

function range(box, z0, z1) {
  const tiles = [];
  for (let z = z0; z <= z1; z++) {
    const x0 = tx(box.w, z);
    const x1 = tx(box.e, z);
    const yNorth = ty(box.n, z);
    const ySouth = ty(box.s, z);
    const y0 = Math.min(yNorth, ySouth);
    const y1 = Math.max(yNorth, ySouth);
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) tiles.push({ z, x, y });
    }
  }
  return tiles;
}

const jobs = [];
for (const t of range(TW, 11, 13)) {
  jobs.push({ url: GRAY(t.z, t.y, t.x), file: path.join(OUT, 'gray', String(t.z), String(t.x), `${t.y}.jpg`) });
  jobs.push({ url: TOPO(t.z, t.y, t.x), file: path.join(OUT, 'topo', String(t.z), String(t.x), `${t.y}.jpg`) });
  jobs.push({ url: SAT(t.z, t.y, t.x), file: path.join(OUT, 'sat', String(t.z), String(t.x), `${t.y}.jpg`) });
  jobs.push({ url: DEM(t.z, t.x, t.y), file: path.join(OUT, 'dem', String(t.z), String(t.x), `${t.y}.png`) });
}
for (const t of range(TB, 14, 16)) {
  jobs.push({ url: GRAY(t.z, t.y, t.x), file: path.join(OUT, 'gray', String(t.z), String(t.x), `${t.y}.jpg`) });
  jobs.push({ url: TOPO(t.z, t.y, t.x), file: path.join(OUT, 'topo', String(t.z), String(t.x), `${t.y}.jpg`) });
  jobs.push({ url: SAT(t.z, t.y, t.x), file: path.join(OUT, 'sat', String(t.z), String(t.x), `${t.y}.jpg`) });
}
for (const t of range(TB, 10, 14)) {
  jobs.push({ url: DEM(t.z, t.x, t.y), file: path.join(OUT, 'dem', String(t.z), String(t.x), `${t.y}.png`) });
}

async function fetchOne(job, attempt = 1) {
  if (fs.existsSync(job.file) && fs.statSync(job.file).size > 0) return 'skip';
  fs.mkdirSync(path.dirname(job.file), { recursive: true });
  try {
    const res = await fetch(job.url, {
      headers: { 'User-Agent': 'BCM2027-lopeguide/1.0 (local course guide)' },
    });
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 32) throw new Error('empty');
    fs.writeFileSync(job.file, buf);
    return 'ok';
  } catch (err) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 400 * attempt));
      return fetchOne(job, attempt + 1);
    }
    return 'fail';
  }
}

let ok = 0;
let skip = 0;
let fail = 0;
let cursor = 0;

async function worker() {
  while (cursor < jobs.length) {
    const i = cursor++;
    const result = await fetchOne(jobs[i]);
    if (result === 'ok') ok++;
    else if (result === 'skip') skip++;
    else fail++;
    const done = ok + skip + fail;
    if (done % 100 === 0 || done === jobs.length) {
      console.log(`${done}/${jobs.length}  ok ${ok}  hoppet over ${skip}  feil ${fail}`);
    }
  }
}

console.log(`Fliser å hente: ${jobs.length}`);
await Promise.all(Array.from({ length: PARALLEL }, () => worker()));
console.log(`Ferdig. OK ${ok}, hoppet over ${skip}, feil ${fail}.`);
if (fail) process.exitCode = 1;
