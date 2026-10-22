import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { DistKey, HillKey, SplitKey } from '../config';

export type PlanState = {
  dist: DistKey;
  targetHalf: number;
  targetFull: number;
  split: SplitKey;
  sigma: number;
  hill: HillKey;
  drink: boolean;
  stopOn: number;
  startHalf: string;
  startFull: string;
  tab: 'seg' | 'km';
  view: 'distanse' | 'plan' | 'profil' | 'splits' | 'mile' | 'band' | 'oppsummering';
  layers: { drink: boolean; toilet: boolean; relay: boolean; terrain: boolean };
  view3d: boolean;
};

const KEY = 'bcm27-plan-v1';

export const PLAN_DEFAULT: PlanState = {
  dist: 'half',
  targetHalf: 5400,
  targetFull: 10800,
  split: 'jevn',
  sigma: 2,
  hill: 'middels',
  drink: false,
  stopOn: 10,
  startHalf: '09:00',
  startFull: '07:45',
  tab: 'seg',
  view: 'plan',
  layers: { drink: true, toilet: true, relay: true, terrain: true },
  view3d: false,
};

function load(): PlanState {
  if (typeof localStorage === 'undefined') return PLAN_DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return PLAN_DEFAULT;
    const p = JSON.parse(raw) as Omit<Partial<PlanState>, 'tab'> & { tab?: string };
    const dist = p.dist === 'full' ? 'full' : 'half';
    const split = p.split === 'negativ' || p.split === 'positiv' ? p.split : 'jevn';
    const hill = p.hill === 'fort' || p.hill === 'sakte' ? p.hill : 'middels';
    const savedView =
      p.view === 'distanse' ||
      p.view === 'profil' ||
      p.view === 'splits' ||
      p.view === 'mile' ||
      p.view === 'band' ||
      p.view === 'oppsummering'
        ? p.view
        : 'plan';
    const view = p.tab === 'band' && savedView === 'splits' ? 'band' : savedView;
    const tab = p.tab === 'km' ? 'km' : 'seg';
    return {
      ...PLAN_DEFAULT,
      ...p,
      dist,
      split,
      hill,
      view,
      tab,
      sigma: typeof p.sigma === 'number' ? p.sigma : 2,
      stopOn: typeof p.stopOn === 'number' ? Math.max(0, Math.min(120, p.stopOn)) : 10,
      layers: { ...PLAN_DEFAULT.layers, ...(p.layers ?? {}) },
    };
  } catch {
    return PLAN_DEFAULT;
  }
}

type Api = {
  state: PlanState;
  patch: (p: Partial<PlanState>) => void;
  setLayer: (k: keyof PlanState['layers'], v: boolean) => void;
};

const Ctx = createContext<Api | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlanState>(load);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);
  const api = useMemo<Api>(
    () => ({
      state,
      patch: (p) => setState((s) => ({ ...s, ...p })),
      setLayer: (k, v) => setState((s) => ({ ...s, layers: { ...s.layers, [k]: v } })),
    }),
    [state],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function usePlan(): Api {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('PlanProvider mangler');
  return ctx;
}

export const VIEW_SCROLL_ID: Record<PlanState['view'], string> = {
  distanse: 'distanse-step-continue',
  plan: 'tempo-tittel',
  profil: 'profil-tittel',
  splits: 'mellom-tittel',
  mile: 'mile-tittel',
  band: 'band-tittel',
  oppsummering: 'oppsummering-tittel',
};

const VIEW_SCROLL_ALIGN: Partial<Record<PlanState['view'], ScrollLogicalPosition>> = {
  distanse: 'end',
};

function scrollOffsetPx() {
  const nav = document.querySelector('.nav');
  const navH = nav?.getBoundingClientRect().height ?? 72;
  return navH + 24;
}

export function scrollToId(id: string, block: ScrollLogicalPosition = 'start') {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (block === 'start') {
    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffsetPx();
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
    return;
  }
  el.scrollIntoView({ block, behavior: reduce ? 'auto' : 'smooth' });
}

/** Scroll etter at React har tegnet nytt panel (dobbelt rAF). */
export function scrollToView(view: PlanState['view']) {
  const id = VIEW_SCROLL_ID[view];
  const block = VIEW_SCROLL_ALIGN[view] ?? 'start';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToId(id, block));
  });
}
