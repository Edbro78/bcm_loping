import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { courseId } from '../lib/gpx';
import { planFromPoints, type Plan, type PlanInput } from '../lib/model';
import { useCourse } from './course';
import { usePlan } from './plan';

const HoverCtx = createContext<{ km: number | null; setKm: (k: number | null) => void }>({
  km: null,
  setKm: () => {},
});

export function HoverProvider({ children }: { children: ReactNode }) {
  const [km, setKm] = useState<number | null>(null);
  const value = useMemo(() => ({ km, setKm }), [km]);
  return <HoverCtx.Provider value={value}>{children}</HoverCtx.Provider>;
}

export function useHover() {
  return useContext(HoverCtx);
}

export function useActivePlan(): { plan: Plan | null; input: PlanInput } {
  const { state } = usePlan();
  const course = useCourse();
  const input = useMemo<PlanInput>(
    () => ({
      full: state.dist === 'full',
      T: state.dist === 'full' ? state.targetFull : state.targetHalf,
      split: state.split,
      sigma: state.sigma,
      hill: state.hill,
      stopSec: state.drink ? state.stopOn : 2,
      start: state.dist === 'full' ? state.startFull : state.startHalf,
    }),
    [state],
  );
  const id = courseId(course.name, course.points) + JSON.stringify(input);
  const plan = useMemo(
    () => (course.points.length > 10 ? planFromPoints(course.points, input) : null),
    // id dekker punktene og input
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  );
  return { plan, input };
}
