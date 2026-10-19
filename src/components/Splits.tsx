import { Fragment } from 'react';
import { Printer, Droplet } from 'lucide-react';
import {
  BAND_FULL,
  BAND_HALF,
  CP,
  FULL_EXTRA_STATION,
  HILLS,
  LAP,
  REF_COLS_FULL,
  REF_COLS_HALF,
  REF_FULL,
  REF_HALF,
  TERR,
  type TerrKey,
} from '../config';
import { clockDot, clockS, fmtP, fmtT, kmL, nb, sgn, sgnS } from '../lib/format';
import { buildPlan, gradeOf, type Plan } from '../lib/model';
import { elevAt, type Pt } from '../lib/gpx';
import { PaceSvg, useBoxWidth } from './chart';
import { useActivePlan } from '../state/active';
import { useCourse } from '../state/course';
import { usePlan } from '../state/plan';

type Mark = { km: number; name: string };

export function splitMarks(full: boolean): Mark[] {
  const rows: Mark[] = [{ km: 0, name: 'Start' }];
  if (!full) {
    for (const [km, name] of CP) rows.push({ km, name });
  } else {
    for (const [km, name] of CP) {
      rows.push({ km, name: Math.abs(km - LAP) < 0.02 ? 'Halvveis · cut-off' : name });
    }
    rows.push({ km: FULL_EXTRA_STATION, name: 'Drikke Bryggen' });
    for (const [km, name] of CP) {
      rows.push({ km: km + LAP, name: Math.abs(km - LAP) < 0.02 ? 'Mål' : name });
    }
    for (const k of [25, 30, 35, 40]) rows.push({ km: k, name: `${k} km` });
  }
  rows.sort((a, b) => a.km - b.km);
  const out: Mark[] = [];
  for (const r of rows) {
    const prev = out[out.length - 1];
    if (prev && Math.abs(prev.km - r.km) <= 0.02) {
      if (/Halvveis|Mål|Bryggen/.test(r.name)) prev.name = r.name;
      continue;
    }
    out.push({ ...r });
  }
  return out;
}

export function terrOf(a: number, b: number, g: number): TerrKey {
  const mid = (a + b) / 2;
  const lk = ((mid % LAP) + LAP) % LAP;
  const atJoin = Math.abs(lk) < 1e-4 || Math.abs(lk - LAP) < 1e-3;
  const lapKm = atJoin ? (mid > LAP / 2 ? LAP : 0) : lk;
  if (lapKm >= 17.79 && lapKm <= 18.41) return 'cobble';
  if (g >= 2) return 'climb';
  if (g <= -2) return 'down';
  return 'flat';
}

export function Splits() {
  const { state, patch } = usePlan();
  const { plan } = useActivePlan();
  const course = useCourse();
  const { ref, w } = useBoxWidth();
  if (!plan) return <p className="intro">Laster mellomtider…</p>;
  return (
    <section className="section" aria-labelledby="mellom-tittel">
      <h2 id="mellom-tittel">Delsegmenter og mellomtider</h2>
      <div className="legend-row" aria-hidden="true">
        <span><i className="swatch pace" /> Målfart</span>
        <span><i className="swatch gap" /> GAP</span>
        <span><i className="swatch elev" /> Høyde</span>
      </div>
      <div className="card" ref={ref}>
        <PaceSvg plan={plan} points={course.points} width={w} />
      </div>
      <div className="subtabs" role="tablist" aria-label="Mellomtider">
        {(
          [
            ['seg', 'Segmenter'],
            ['km', 'Per km'],
          ] as const
        ).map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={state.tab === id} className={state.tab === id ? 'is-on' : ''} onClick={() => patch({ tab: id })}>
            {label}
          </button>
        ))}
      </div>
      {state.tab === 'seg' && <Segments plan={plan} />}
      {state.tab === 'km' && <PerKm plan={plan} />}
      <Reference plan={plan} points={course.points} />
    </section>
  );
}

function Segments({ plan }: { plan: Plan }) {
  const full = plan.input.full;
  const m = splitMarks(full);
  const segs = [];
  for (let i = 1; i < m.length; i++) segs.push({ a: m[i - 1].km, b: m[i].km, name: m[i].name });
  const r1 = segs.filter((s) => s.b <= LAP + 0.001);
  const r2 = segs.filter((s) => s.b > LAP + 0.001);

  const row = (s: { a: number; b: number; name: string }) => {
    const g = plan.agg(s.a, s.b);
    const grade = gradeOf(g);
    const terr = terrOf(s.a, s.b, grade);
    const pace = g.len ? (g.t + g.stops) / g.len : 0;
    const gap = g.fd ? g.t / g.fd : 0;
    const cum = plan.tAt(s.b);
    const dev = cum - s.b * (plan.input.T / plan.D);
    const meta = TERR[terr];
    return (
      <tr key={`${s.a}-${s.name}`} style={{ background: meta.bg }}>
        <th scope="row">
          <span className="seg-name">{s.name}</span>
          <span className="chip" style={{ background: meta.chipBg, color: meta.chipFg }}>{meta.l}</span>
          <span className="km-range">km {kmL(s.a)}–{kmL(s.b)}</span>
        </th>
        <td>{Math.round(g.len * 1000)}</td>
        <td>{sgn(grade)}</td>
        <td>+{Math.round(g.up)} / −{Math.round(g.dn)}</td>
        <td>{fmtT(g.t + g.stops)}</td>
        <td>{fmtP(pace)}</td>
        <td>{fmtP(gap)}</td>
        <td>{fmtT(cum)}</td>
        <td>{clockS(plan.input.start, cum)}</td>
        <td className={dev < -0.5 ? 'ahead' : 'behind'}>{sgnS(dev)}</td>
      </tr>
    );
  };

  const sum = (a: number, b: number, title: string) => {
    const g = plan.agg(a, b);
    return (
      <tr key={title} className="sum">
        <th scope="row">{title}</th>
        <td>{Math.round(g.len * 1000)}</td>
        <td>{sgn(gradeOf(g))}</td>
        <td>+{Math.round(g.up)} / −{Math.round(g.dn)}</td>
        <td>{fmtT(g.t + g.stops)}</td>
        <td>{fmtP(g.len ? (g.t + g.stops) / g.len : 0)}</td>
        <td>{fmtP(g.fd ? g.t / g.fd : 0)}</td>
        <td>{fmtT(plan.tAt(b))}</td>
        <td>{clockS(plan.input.start, plan.tAt(b))}</td>
        <td>{sgnS(plan.tAt(b) - b * (plan.input.T / plan.D))}</td>
      </tr>
    );
  };

  return (
    <>
      <div className="chips">
        {(Object.keys(TERR) as TerrKey[]).map((k) => (
          <span key={k} className="chip" style={{ background: TERR[k].chipBg, color: TERR[k].chipFg }}>{TERR[k].l}</span>
        ))}
        <span className="help">Avvik = kumulativ tid mot jevn snittfart hele veien.</span>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              {['Segment', 'Lengde (m)', 'Stigning (%)', 'Opp / ned', 'Segmenttid', 'Fart', 'GAP', 'Kumulativ', 'Klokke', 'Avvik'].map((h) => (
                <th key={h} scope="col">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {full ? (
              <>
                <tr className="round"><th colSpan={10}>Runde 1</th></tr>
                {r1.map(row)}
                {sum(0, LAP, 'Sum runde 1')}
                <tr className="round"><th colSpan={10}>Runde 2</th></tr>
                {r2.map(row)}
                {sum(LAP, plan.D, 'Sum runde 2')}
              </>
            ) : (
              segs.map(row)
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PerKm({ plan }: { plan: Plan }) {
  const rows = [];
  for (let a = 0; a < plan.D - 1e-6; a += 1) {
    const b = Math.min(plan.D, a + 1);
    const g = plan.agg(a, b);
    const grade = gradeOf(g);
    const pace = g.len ? (g.t + g.stops) / g.len : 0;
    const gap = g.fd ? g.t / g.fd : 0;
    const steep = Math.abs(grade) >= 3;
    const label = Math.abs(b - plan.D) < 0.02 && b - a < 0.999 ? kmL(b) : String(Math.round(a + 1));
    rows.push({ a, b, g, grade, pace, gap, steep, label });
  }
  return (
    <div className="table-wrap">
      <table className="data km">
        <thead>
          <tr>
            {['Km', 'Stigning', 'Høydeendr.', 'GAP-faktor', 'Målfart', 'GAP', 'Kumulativ', 'Klokke', 'Drikke'].map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const cum = plan.tAt(r.b);
            const band = plan.input.full && r.a === 21;
            return (
              <Fragment key={r.a}>
                {band && (
                  <tr className="cut-band">
                    <td colSpan={9}>Halvveis · cut-off kl. 10.45 på Bryggen</td>
                  </tr>
                )}
                <tr className={r.steep ? 'steep' : ''}>
                  <th scope="row">{r.label}</th>
                  <td className={r.steep ? 'hot' : ''}>{sgn(r.grade)}</td>
                  <td>{sgn(r.g.up - r.g.dn, 0)}</td>
                  <td>{nb(r.g.len ? r.g.fd / r.g.len : 0, 3)}</td>
                  <td>{fmtP(r.pace)}</td>
                  <td>{fmtP(r.gap)}</td>
                  <td>{fmtT(cum)}</td>
                  <td>{clockS(plan.input.start, cum)}</td>
                  <td>{r.g.stops > 0 && <span className="drop"><Droplet size={14} /> +{Math.round(r.g.stops)} s</span>}</td>
                </tr>
                {r.steep && (
                  <tr className="steep-note">
                    <td colSpan={9}>
                      Km {r.label}: {sgn(r.grade)} % → {fmtP(r.pace)}/km tilsvarer {fmtP(r.gap)}/km flatt
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Wristband() {
  const { plan } = useActivePlan();
  if (!plan) return <p className="intro">Laster armbåndskort…</p>;
  return (
    <section className="section" aria-labelledby="band-tittel">
      <h2 id="band-tittel">Armbåndskort</h2>
      <p className="intro">Mellomtidene på et kort du kan skrive ut og ha på armen.</p>
      <Band plan={plan} />
    </section>
  );
}

function Band({ plan }: { plan: Plan }) {
  const rows = plan.input.full ? BAND_FULL : BAND_HALF;
  const hill = HILLS[plan.input.hill].l;
  const split = plan.input.split === 'jevn' ? 'jevn' : plan.input.split;
  return (
    <div className="band-wrap">
      <article id="armband">
        <header>
          <p>BCM 2027 · {plan.input.full ? 'Maraton' : 'Halvmaraton'}</p>
          <b>{fmtT(plan.input.T)}</b>
        </header>
        <ul>
          {rows.map(([km, name]) => {
            const hi = /Halvveis|Mål/.test(name);
            return (
              <li key={name + km} className={hi ? 'hi' : ''}>
                <span>
                  <strong>{kmL(km)}</strong>
                  <em>{name}</em>
                </span>
                <b>{fmtT(plan.tAt(km))}</b>
                <small>{clockDot(plan.input.start, plan.tAt(km))}</small>
              </li>
            );
          })}
        </ul>
        <footer>
          <span>Flat {fmtP(plan.p0)}/km · {hill}, {split}</span>
          <span>Start {plan.input.start.replace(':', '.')}</span>
        </footer>
      </article>
      <button type="button" className="btn primary no-print" onClick={() => window.print()}>
        <Printer size={16} /> Skriv ut kortet
      </button>
    </div>
  );
}

function Reference({ plan, points }: { plan: Plan; points: Pt[] }) {
  const full = plan.input.full;
  const targets = full ? REF_FULL : REF_HALF;
  const cols = full ? REF_COLS_FULL : REF_COLS_HALF;
  const rows = targets.map((T) => {
    const p = buildPlan((k) => elevAt(points, k), {
      full,
      T,
      split: 'jevn',
      sigma: 0,
      hill: 'middels',
      stopSec: 2,
      start: plan.input.start,
    });
    return { T, p };
  });
  const strategies = full
    ? ([
        ['Middels, jevn', 'middels', 'jevn', 0],
        ['Sakte, jevn', 'sakte', 'jevn', 0],
        ['Fort, jevn', 'fort', 'jevn', 0],
        ['Middels, negativ 2 %', 'middels', 'negativ', 2],
        ['Sakte, negativ 2 %', 'sakte', 'negativ', 2],
        ['Middels, positiv 2 %', 'middels', 'positiv', 2],
      ] as const)
    : [];

  return (
    <details className="explain">
      <summary>Referansetabell</summary>
      <p className="help">Middels, jevn, drikke av. Raden nærmest målet ditt er markert.</p>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th scope="col">Mål</th>
              {cols.map((c) => (
                <th key={c} scope="col">{Math.abs(c - (full ? LAP * 2 : LAP)) < 0.01 ? 'Mål' : kmL(c)}</th>
              ))}
              <th scope="col">Flatfart</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ T, p }) => (
              <tr key={T} className={Math.abs(T - plan.input.T) <= 60 ? 'is-you' : ''}>
                <th scope="row">{fmtT(T)}</th>
                {cols.map((c) => (
                  <td key={c}>{fmtT(p.tAt(c))}</td>
                ))}
                <td>{fmtP(p.p0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {full && (
        <>
          <h3>Strategier for sub 3:00</h3>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Strategi</th>
                  <th scope="col">5 km</th>
                  <th scope="col">10 km</th>
                  <th scope="col">21,1 km</th>
                  <th scope="col">Flatfart</th>
                </tr>
              </thead>
              <tbody>
                {strategies.map(([label, hill, split, sigma]) => {
                  const p = buildPlan((k) => elevAt(points, k), {
                    full: true,
                    T: 10800,
                    split,
                    sigma,
                    hill,
                    stopSec: 2,
                    start: '07:45',
                  });
                  return (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{fmtT(p.tAt(5))}</td>
                      <td>{fmtT(p.tAt(10))}</td>
                      <td>{fmtT(p.tAt(LAP))}</td>
                      <td>{fmtP(p.p0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </details>
  );
}
