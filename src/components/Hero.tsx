import { useEffect, useRef, useState } from 'react';
import { CalendarRange, Flag, Route, Timer, type LucideIcon } from 'lucide-react';
import { RACE_START } from '../config';
import { LAP } from '../config';
import { elevAt } from '../lib/gpx';
import { useCourse } from '../state/course';
import { scrollToId, usePlan, type PlanState } from '../state/plan';

function Countdown({ dist }: { dist: 'half' | 'full' }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 10);
    return () => window.clearInterval(id);
  }, []);
  const target = new Date(RACE_START[dist]).getTime();
  const diff = Math.max(0, target - now);
  const parts: [string, number][] = [
    ['Dager', Math.floor(diff / 86400000)],
    ['Timer', Math.floor((diff % 86400000) / 3600000)],
    ['Minutter', Math.floor((diff % 3600000) / 60000)],
    ['Sekunder', Math.floor((diff % 60000) / 1000)],
    ['Hundredeler', Math.floor((diff % 1000) / 10)],
  ];
  const startLabel = dist === 'full' ? '07.45' : '09.00';
  return (
    <>
      <p className="count-label">{diff === 0 ? 'Løpet har startet' : `Nedtelling til start kl. ${startLabel}`}</p>
      <div className="count-boxes">
        {parts.map(([l, n]) => (
          <div key={l} className="count-box">
            <b>{String(n).padStart(2, '0')}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </>
  );
}

const STEPS: { icon: LucideIcon; text: string; view: PlanState['view'] }[] = [
  { icon: Flag, text: 'Velge distanse (hel eller halv)', view: 'distanse' },
  { icon: Timer, text: 'Ønsket sluttid', view: 'plan' },
  { icon: Route, text: 'Anbefalt løpeplan', view: 'splits' },
  { icon: CalendarRange, text: 'Anbefalte milepæler siste 90 dager av treningen', view: 'mile' },
];

const PLACES: [number, string][] = [
  [0, 'Bryggen'],
  [3.2, 'Gamle Bergen'],
  [6.2, 'Fjellveien'],
  [14, 'Lungegårdsvann'],
  [LAP - 2, 'Nordnes'],
  [LAP, 'Bryggen'],
];

export function Hero() {
  const { state, patch } = usePlan();
  const course = useCourse();

  function goToStep(view: PlanState['view']) {
    patch({ view });
    requestAnimationFrame(() => scrollToId('faner'));
  }

  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <p className="kicker">Bergen City Marathon 2027 · uavhengig guide</p>
          <h1>BCM løpeguide, tempoplanlegger og milepæler</h1>
        </div>
        <div className="hero-side">
          <Countdown dist={state.dist} />
          {course.status === 'loading' ? (
            <p className="badge wait">Laster løype…</p>
          ) : course.status === 'ok' ? (
            <p className="badge ok">GPX lastet inn · eksakt trasé</p>
          ) : (
            <p className="badge warn">Høydedata estimert</p>
          )}
          {course.error && (
            <p className="hero-error" role="alert">
              {course.error}
            </p>
          )}
        </div>
        <ol className="steps" aria-label="Slik bruker du verktøyet">
          {STEPS.map((step, i) => (
            <li key={step.text}>
              <button
                type="button"
                className="step-card"
                onClick={() => goToStep(step.view)}
                aria-label={`Steg ${i + 1}: ${step.text}. Trykk for å åpne.`}
              >
                <span className="step-ico">
                  <step.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  <span className="step-n">{i + 1}</span>
                </span>
                <span className="step-text">{step.text}</span>
                <span className="step-action" aria-hidden="true">
                  Trykk her
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      {course.points.length > 10 && <Spark />}
    </section>
  );
}

function Spark() {
  const course = useCourse();
  const svgRef = useRef<SVGSVGElement>(null);
  const runRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<SVGTextElement>(null);
  const tRef = useRef(0);
  const scrubbing = useRef(false);
  const holdUntil = useRef(0);
  const W = 1000;
  const H = 78;
  const pad = 48;
  const pts = course.points.filter((_, i) => i % 4 === 0);
  const Y = (e: number) => 8 + (1 - Math.min(e, 150) / 150) * 46;
  const X = (k: number) => pad + (k / LAP) * (W - pad * 2);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.km).toFixed(1)},${Y(p.ele).toFixed(1)}`).join(' ');

  useEffect(() => {
    const run = runRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!run || !dot || !d) return;
    const len = run.getTotalLength();
    const apply = (t: number) => {
      const clamped = Math.min(1, Math.max(0, t));
      run.style.strokeDasharray = `${len}`;
      run.style.strokeDashoffset = `${len * (1 - clamped)}`;
      const p = run.getPointAtLength(Math.max(0, len * clamped - 0.01));
      dot.setAttribute('cx', p.x.toFixed(1));
      dot.setAttribute('cy', p.y.toFixed(1));
      if (label) {
        const km = (clamped * LAP).toFixed(1).replace('.', ',');
        label.textContent = `${km} km`;
        const flip = p.x > W * 0.78;
        label.setAttribute('x', (flip ? p.x - 10 : p.x + 10).toFixed(1));
        label.setAttribute('y', Math.max(12, p.y - 10).toFixed(1));
        label.setAttribute('text-anchor', flip ? 'end' : 'start');
      }
      svgRef.current?.setAttribute('aria-valuenow', String(Math.round(clamped * LAP * 10) / 10));
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      apply(1);
      return;
    }
    apply(tRef.current);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!scrubbing.current) {
        if (holdUntil.current > now) {
          apply(1);
        } else {
          tRef.current += dt / 18000;
          if (tRef.current >= 1) {
            tRef.current = 1;
            holdUntil.current = now + 700;
          }
          if (holdUntil.current && now > holdUntil.current) {
            tRef.current = 0;
            holdUntil.current = 0;
          }
          apply(tRef.current);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [d]);

  const scrub = (clientX: number) => {
    const svg = svgRef.current;
    const run = runRef.current;
    if (!svg || !run) return;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    tRef.current = Math.min(1, Math.max(0, (x - pad) / (W - pad * 2)));
    holdUntil.current = 0;
    const len = run.getTotalLength();
    run.style.strokeDasharray = `${len}`;
    run.style.strokeDashoffset = `${len * (1 - tRef.current)}`;
    const p = run.getPointAtLength(Math.max(0, len * tRef.current - 0.01));
    dotRef.current?.setAttribute('cx', p.x.toFixed(1));
    dotRef.current?.setAttribute('cy', p.y.toFixed(1));
    if (labelRef.current) {
      const km = (tRef.current * LAP).toFixed(1).replace('.', ',');
      labelRef.current.textContent = `${km} km`;
      const flip = p.x > W * 0.78;
      labelRef.current.setAttribute('x', (flip ? p.x - 10 : p.x + 10).toFixed(1));
      labelRef.current.setAttribute('y', Math.max(12, p.y - 10).toFixed(1));
      labelRef.current.setAttribute('text-anchor', flip ? 'end' : 'start');
    }
  };

  return (
    <svg
      ref={svgRef}
      className="spark"
      viewBox={`0 0 ${W} ${H}`}
      role="slider"
      aria-label="Høydeprofil fra Bryggen til mål"
      aria-valuemin={0}
      aria-valuemax={21.1}
      aria-valuenow={0}
      tabIndex={0}
      onPointerDown={(e) => {
        scrubbing.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        scrub(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse' || scrubbing.current) {
          scrubbing.current = true;
          scrub(e.clientX);
        }
      }}
      onPointerUp={() => {
        scrubbing.current = false;
      }}
      onPointerLeave={() => {
        scrubbing.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        scrubbing.current = true;
        tRef.current = Math.min(1, Math.max(0, tRef.current + (e.key === 'ArrowRight' ? 0.02 : -0.02)));
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        scrub(rect.left + ((pad + tRef.current * (W - pad * 2)) / W) * rect.width);
        window.setTimeout(() => {
          scrubbing.current = false;
        }, 1200);
      }}
    >
      <path className="track" d={d} />
      <path ref={runRef} className="run" d={d} />
      {PLACES.map(([k, name], i) => {
        const last = i === PLACES.length - 1;
        const anchor = i === 0 ? 'start' : last ? 'end' : 'middle';
        const x = i === 0 ? 8 : last ? W - 8 : X(k);
        return (
          <g key={`${name}-${k}`}>
            <circle cx={X(k)} cy={Y(elevAt(course.points, k))} r={3} />
            <text x={x} y={H - 6} textAnchor={anchor}>
              {name}
            </text>
          </g>
        );
      })}
      <circle ref={dotRef} className="runner" r={5.5} cx={X(0)} cy={Y(elevAt(course.points, 0))} />
      <text ref={labelRef} className="spark-km" x={X(0) + 10} y={12}>
        0,0 km
      </text>
    </svg>
  );
}
