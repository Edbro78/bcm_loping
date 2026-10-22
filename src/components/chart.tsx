import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { useUi } from '../i18n/useUi';
import { usePreviewLocale } from '../state/previewLocale';
import { BAND_FULL, BAND_HALF, LAP } from '../config';
import { clockDot, fmtP, fmtT, kmL, sgn } from '../lib/format';
import { elevAt, type Pt } from '../lib/gpx';
import { type Plan } from '../lib/model';
import { useHover } from '../state/active';

export function useBoxWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(720);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const pad = parseFloat(getComputedStyle(el).paddingLeft) + parseFloat(getComputedStyle(el).paddingRight);
      setW(Math.max(320, Math.round(el.clientWidth - pad)));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, w };
}

function segAt(plan: Plan, km: number) {
  return plan.segs.find((s) => km >= s.x0 - 1e-9 && km < s.x0 + s.d - 1e-6) ?? plan.segs[plan.segs.length - 1];
}

export function ChartHover({
  plan,
  points,
  W,
  H,
  PL,
  PR,
}: {
  plan: Plan;
  points: Pt[];
  W: number;
  H: number;
  PL: number;
  PR: number;
}) {
  const { km } = useHover();
  if (km == null || !plan.segs.length) return null;
  const x = PL + (km / plan.D) * (W - PL - PR);
  const s = segAt(plan, km);
  const ele = Math.round(elevAt(points, km));
  const pace = s.d > 0 ? (s.t + s.stop) / s.d : plan.p0;
  const label = `Km ${kmL(km)} · ${ele} moh · ${sgn(s.g)} % · ${fmtT(plan.tAt(km))} (kl. ${clockDot(plan.input.start, plan.tAt(km))}) · ${fmtP(pace)}/km`;
  const flip = x > W * 0.55;
  const tx = flip ? x - 8 : x + 8;
  const anchor = flip ? 'end' : 'start';
  return (
    <g>
      <line x1={x} x2={x} y1={16} y2={H - 18} stroke="#12304A" strokeWidth={1.5} />
      <circle cx={x} cy={16} r={3.5} fill="#12304A" />
      <g transform={`translate(${tx}, 14)`}>
        <rect x={flip ? -8 : 0} width={8} height={0} fill="none" />
        <foreignObject x={flip ? -280 : 0} y={0} width={280} height={36}>
          <div className={`htag ${flip ? 'end' : ''}`}>{label}</div>
        </foreignObject>
      </g>
      <title>{label}</title>
      <text opacity={0} textAnchor={anchor}>
        {label}
      </text>
    </g>
  );
}

function bindMove(
  W: number,
  D: number,
  PL: number,
  PR: number,
  setKm: (k: number | null) => void,
) {
  return {
    onPointerMove: (e: ReactPointerEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W;
      const k = ((x - PL) / (W - PL - PR)) * D;
      setKm(k < -0.05 || k > D + 0.05 ? null : Math.max(0, Math.min(D, k)));
    },
    onPointerLeave: () => setKm(null),
  };
}

const EPL = 44;
const EPR = 16;
const EPT = 28;
const EPB = 32;

type ElevKind = 'climb' | 'down' | 'flat' | 'cobble';

const ELEV_FACE: Record<ElevKind, { fill: string; stroke: string; label: string }> = {
  climb: { fill: '#F6DEDB', stroke: '#B3322A', label: 'Klatring' },
  flat: { fill: '#E9EEF0', stroke: '#2F5573', label: 'Flatt' },
  down: { fill: '#C5D4E0', stroke: '#12304A', label: 'Nedover' },
  cobble: { fill: '#FBEFD6', stroke: '#9A6A12', label: 'Brostein' },
};

function elevKind(km: number, grade: number): ElevKind {
  const lk = ((km % LAP) + LAP) % LAP;
  if (lk >= 17.79 && lk <= 18.41) return 'cobble';
  if (grade >= 2) return 'climb';
  if (grade <= -2) return 'down';
  return 'flat';
}

export function ElevationSvg({ plan, points, width }: { plan: Plan; points: Pt[]; width: number }) {
  const { km, setKm } = useHover();
  const W = width;
  const H = W < 560 ? 340 : 460;
  const D = plan.D;
  const innerH = H - EPT - EPB;
  const X = (k: number) => EPL + (k / D) * (W - EPL - EPR);
  const Y = (e: number) => EPT + (1 - Math.max(0, Math.min(150, e)) / 150) * innerH;
  const samples: { k: number; e: number }[] = [];
  for (let k = 0; k <= D + 1e-6; k += 0.05) samples.push({ k: Math.min(D, k), e: elevAt(points, Math.min(D, k)) });
  const base = Y(0);
  const runs: { kind: ElevKind; area: string; line: string }[] = [];
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1];
    const b = samples[i];
    const i0 = Math.max(0, i - 4);
    const i1 = Math.min(samples.length - 1, i + 3);
    const span = samples[i1].k - samples[i0].k;
    const grade = span > 0 ? (samples[i1].e - samples[i0].e) / (span * 10) : 0;
    const kind = elevKind((a.k + b.k) / 2, grade);
    const line = `M${X(a.k).toFixed(1)},${Y(a.e).toFixed(1)} L${X(b.k).toFixed(1)},${Y(b.e).toFixed(1)}`;
    const area = `${line} L${X(b.k).toFixed(1)},${base.toFixed(1)} L${X(a.k).toFixed(1)},${base.toFixed(1)} Z`;
    const prev = runs[runs.length - 1];
    if (prev && prev.kind === kind) {
      prev.line += ' ' + line.replace(/^M[\d.-]+,[\d.-]+\s*/, '');
      prev.area += ' ' + area;
    } else runs.push({ kind, line, area });
  }
  const step = plan.input.full || W < 520 ? 5 : 2;
  const ticks = [];
  for (let k = 0; k <= D + 0.01; k += step) ticks.push(Math.min(D, k));
  const short = W < 640;
  const peak = samples.reduce((best, p) => (p.e > best.e ? p : best), samples[0]);
  const labelY = (k: number, lift: number) => Math.max(16, Y(elevAt(points, Math.min(k, D))) - lift);

  return (
    <>
      <svg
        className="chart elev"
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        preserveAspectRatio="none"
        role="img"
        aria-label="Høydeprofil for løypa, farget etter terreng"
        tabIndex={0}
        onKeyDown={(e) => {
          const cur = km ?? 0;
          if (e.key === 'ArrowRight') setKm(Math.min(D, cur + 0.5));
          if (e.key === 'ArrowLeft') setKm(Math.max(0, cur - 0.5));
        }}
        {...bindMove(W, D, EPL, EPR, setKm)}
      >
        <defs>
          <filter id="elev-ridge" x="-4%" y="-8%" width="108%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#12304A" floodOpacity="0.28" />
          </filter>
          <linearGradient id="elev-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E9EEF0" />
            <stop offset="1" stopColor="#F7F4EE" />
          </linearGradient>
        </defs>
        <rect x={0} y={EPT} width={W} height={innerH} fill="url(#elev-sky)" />
        {[0, 25, 50, 75, 100, 125, 150].map((e) => (
          <g key={e}>
            <line x1={0} x2={W} y1={Y(e)} y2={Y(e)} stroke={e % 50 === 0 ? '#C5D0D8' : '#E3EAEE'} strokeDasharray={e % 50 === 0 ? undefined : '2 4'} />
            {e % 50 === 0 && (
              <text x={EPL - 8} y={Y(e) + 4} textAnchor="end" className="ax">
                {e}
              </text>
            )}
          </g>
        ))}
        <text x={8} y={EPT + 12} className="ax mute">
          moh
        </text>
        <g className="elev-draw" filter="url(#elev-ridge)">
          {runs.map((run, i) => (
            <path key={`a${i}`} d={run.area} fill={ELEV_FACE[run.kind].fill} />
          ))}
          {runs.map((run, i) => (
            <path key={`l${i}`} d={run.line} fill="none" stroke={ELEV_FACE[run.kind].stroke} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
          ))}
        </g>
        {plan.stations.map((st) => (
          <g key={st}>
            <line x1={X(st)} x2={X(st)} y1={EPT} y2={H - EPB} stroke="#2E8FA3" strokeOpacity={0.45} strokeDasharray="3 4" />
            <circle cx={X(st)} cy={Y(elevAt(points, st))} r={4} fill="#2E8FA3" stroke="#fff" strokeWidth={1.5} />
          </g>
        ))}
        {plan.input.full && (
          <g>
            <line x1={X(LAP)} x2={X(LAP)} y1={EPT} y2={H - EPB} stroke="#B3322A" strokeDasharray="4 3" />
            <text x={X(LAP) + 6} y={EPT + 14} className="ax cut">
              Halvveis · cut-off 10.45
            </text>
          </g>
        )}
        <g>
          <circle cx={X(peak.k)} cy={Y(peak.e)} r={4.5} fill="#E2A63A" stroke="#fff" strokeWidth={1.5} />
          <text x={X(Math.min(6.2, D))} y={labelY(6.2, 18)} textAnchor="middle" className="place">
            Fjellveien
          </text>
          <text x={X(Math.min(18.1, D))} y={labelY(18.1, 16)} textAnchor="middle" className="place cob">
            {short ? 'Munkeb.' : 'Munkebekksmauet'}
          </text>
          {plan.input.full && (
            <text x={X(Math.min(18.1 + LAP, D))} y={labelY(18.1 + LAP, 16)} textAnchor="middle" className="place cob">
              {short ? 'Munkeb.' : 'Munkebekksmauet'}
            </text>
          )}
        </g>
        {ticks.map((k) => (
          <text key={k} x={X(k)} y={H - 8} textAnchor="middle" className="ax">
            {kmL(k)}
          </text>
        ))}
        {km != null && (
          <circle cx={X(km)} cy={Y(elevAt(points, km))} r={6} fill="#fff" stroke="#B3322A" strokeWidth={2.5} />
        )}
        <ChartHover plan={plan} points={points} W={W} H={H} PL={EPL} PR={EPR} />
      </svg>
      <div className="chips" aria-hidden="true">
        {(Object.keys(ELEV_FACE) as ElevKind[]).map((k) => (
          <span key={k} className="chip" style={{ background: ELEV_FACE[k].fill, color: ELEV_FACE[k].stroke }}>
            <i style={{ background: ELEV_FACE[k].stroke }} /> {ELEV_FACE[k].label}
          </span>
        ))}
      </div>
    </>
  );
}

const PH = 280;
const PPL = 40;
const PPR = 50;
const PPT = 34;
const PPB = 26;

export function PaceSvg({
  plan,
  points,
  width,
  height = PH,
}: {
  plan: Plan;
  points: Pt[];
  width: number;
  height?: number;
}) {
  const { km, setKm } = useHover();
  const W = width;
  const H = height;
  const D = plan.D;
  const X = (k: number) => PPL + (k / D) * (W - PPL - PPR);
  const Ye = (e: number) => PPT + (1 - e / 150) * (H - PPT - PPB);
  const kms: { a: number; b: number; pace: number; gap: number }[] = [];
  for (let a = 0; a < D - 1e-6; a += 1) {
    const b = Math.min(D, a + 1);
    const g = plan.agg(a, b);
    kms.push({
      a,
      b,
      pace: g.len ? (g.t + g.stops) / g.len : 0,
      gap: g.fd ? g.t / g.fd : 0,
    });
  }
  const all = kms.flatMap((k) => [k.pace, k.gap]).filter((n) => n > 0);
  const pmin = Math.min(...all);
  const pmax = Math.max(...all);
  const lo = pmin - 8;
  const hi = pmax + 8;
  const Yp = (p: number) => PPT + ((p - lo) / (hi - lo || 1)) * (H - PPT - PPB);
  const span = hi - lo;
  const grid = span > 90 ? 30 : 15;
  const lines: number[] = [];
  for (let p = Math.ceil(lo / grid) * grid; p <= hi; p += grid) lines.push(p);

  const samples: { k: number; e: number }[] = [];
  for (let k = 0; k <= D + 1e-6; k += 0.05) samples.push({ k: Math.min(D, k), e: elevAt(points, Math.min(D, k)) });
  const elev = samples.map((p, i) => `${i ? 'L' : 'M'}${X(p.k).toFixed(1)},${Ye(p.e).toFixed(1)}`).join(' ');
  const area = `${elev} L${X(D)},${Ye(0)} L${X(0)},${Ye(0)} Z`;

  let paceD = '';
  let gapD = '';
  kms.forEach((k, i) => {
    const cmd = i === 0 ? 'M' : 'L';
    paceD += `${cmd}${X(k.a)},${Yp(k.pace)} L${X(k.b)},${Yp(k.pace)} `;
    gapD += `${cmd}${X(k.a)},${Yp(k.gap)} L${X(k.b)},${Yp(k.gap)} `;
  });

  const bands = plan.input.full ? BAND_FULL : BAND_HALF;
  const showEvery = W < 640;

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      role="img"
      aria-label="Målfart og høyde langs løypa"
      tabIndex={0}
      onKeyDown={(e) => {
        const cur = km ?? 0;
        if (e.key === 'ArrowRight') setKm(Math.min(D, cur + 0.5));
        if (e.key === 'ArrowLeft') setKm(Math.max(0, cur - 0.5));
      }}
      {...bindMove(W, D, PPL, PPR, setKm)}
    >
      <path d={area} fill="#E7EEF3" />
      {[0, 50, 100].map((e) => (
        <text key={e} x={PPL - 6} y={Ye(e) + 3} textAnchor="end" className="ax mute">
          {e}
        </text>
      ))}
      {lines.map((p) => (
        <g key={p}>
          <line x1={PPL} x2={W - PPR} y1={Yp(p)} y2={Yp(p)} stroke="#EAECF0" />
          <text x={W - PPR + 6} y={Yp(p) + 3} className="ax">
            {fmtP(p)}
          </text>
        </g>
      ))}
      <text x={W - 4} y={H - 8} textAnchor="end" className="ax mute">
        min/km
      </text>
      <path d={elev} fill="none" stroke="#8AA3B8" strokeWidth={1.25} />
      <path d={gapD} fill="none" stroke="#2F5573" strokeWidth={1.5} strokeDasharray="5 4" />
      <path d={paceD} fill="none" stroke="#12304A" strokeWidth={2.5} />
      {plan.stations.map((st) => (
        <line key={st} x1={X(st)} x2={X(st)} y1={PPT} y2={H - PPB} stroke="#8AA3B8" strokeDasharray="3 3" />
      ))}
      {plan.input.full && <line x1={X(LAP)} x2={X(LAP)} y1={PPT} y2={H - PPB} stroke="#B3322A" />}
      {bands.map(([k, name], i) => {
        if (k > D + 0.02) return null;
        const x = Math.max(PPL + 22, Math.min(W - PPR - 26, X(k)));
        const y = Ye(elevAt(points, k));
        const show = !showEvery || i % 2 === 0;
        return (
          <g key={name + k}>
            <circle cx={X(k)} cy={y} r={4} fill="#12304A" stroke="#fff" strokeWidth={1.5} />
            {show && (
              <text x={x} y={i % 2 === 0 ? PPT - 8 : PPT - 20} textAnchor="middle" className="ax">
                {fmtT(plan.tAt(k))}
              </text>
            )}
          </g>
        );
      })}
      <ChartHover plan={plan} points={points} W={W} H={H} PL={PPL} PR={PPR} />
    </svg>
  );
}

function usePortalMount(open: boolean) {
  const [mount, setMount] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    setMount((document.querySelector('.preview-phone-frame') ?? document.body) as HTMLElement);
  }, [open]);
  return mount;
}

function ChartLandscapeOverlay({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const m = useUi();
  const mount = usePortalMount(open);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = document.querySelector('.preview-phone-frame') as HTMLElement | null;
    const prevFrameOverflow = frame?.style.overflow ?? '';
    const prevBodyOverflow = document.body.style.overflow;
    if (frame) frame.style.overflow = 'hidden';
    else document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const node = overlayRef.current;
    const enterFs = async () => {
      if (!node?.requestFullscreen) return;
      try {
        await node.requestFullscreen();
        const ori = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
        await ori.lock?.('landscape').catch(() => undefined);
      } catch {
        /* preview / permissions */
      }
    };
    void enterFs();

    return () => {
      document.removeEventListener('keydown', onKey);
      if (frame) frame.style.overflow = prevFrameOverflow;
      else document.body.style.overflow = prevBodyOverflow;
      if (document.fullscreenElement === node) {
        void document.exitFullscreen().catch(() => undefined);
      }
      const ori = screen.orientation as ScreenOrientation & { unlock?: () => void };
      ori.unlock?.();
    };
  }, [open, onClose]);

  if (!open || !mount) return null;

  return createPortal(
    <div ref={overlayRef} className="chart-landscape-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <header className="chart-landscape-head">
        <p className="chart-landscape-title">{title}</p>
        <button type="button" className="chart-landscape-close" onClick={onClose}>
          {m.splits.closeFullscreen}
        </button>
      </header>
      <div className="chart-landscape-body">{children}</div>
    </div>,
    mount,
  );
}

function PaceLandscapeChart({ plan, points }: { plan: Plan; points: Pt[] }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [height, setHeight] = useState(360);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const apply = () => {
      const pad = 12;
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      setWidth(Math.max(360, Math.round(ch - pad)));
      setHeight(Math.max(280, Math.round(cw - pad)));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={bodyRef} className="chart-landscape-rotator">
      <div className="chart-landscape-rotator-in">
        <PaceSvg plan={plan} points={points} width={width} height={height} />
      </div>
    </div>
  );
}

export function PaceChartCard({ plan, points }: { plan: Plan; points: Pt[] }) {
  const { ref, w } = useBoxWidth();
  const { device } = usePreviewLocale();
  const m = useUi();
  const [open, setOpen] = useState(false);
  const expandable = device === 'mobile';

  function openFullscreen() {
    if (!expandable) return;
    setOpen(true);
  }

  async function closeFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
    }
    setOpen(false);
  }

  function onCardKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFullscreen();
    }
  }

  return (
    <>
      <div
        ref={ref}
        className={`card chart-pace-card${expandable ? ' chart-pace-card--expandable' : ''}`}
        {...(expandable
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': m.splits.chartExpand,
              onClick: openFullscreen,
              onKeyDown: onCardKeyDown,
            }
          : {})}
      >
        {expandable && (
          <span className="chart-pace-hint" aria-hidden="true">
            {m.splits.chartExpandHint}
          </span>
        )}
        <PaceSvg plan={plan} points={points} width={w} />
      </div>
      <ChartLandscapeOverlay open={open} onClose={() => void closeFullscreen()} title={m.splits.chartFullscreenTitle}>
        <PaceLandscapeChart plan={plan} points={points} />
      </ChartLandscapeOverlay>
    </>
  );
}
