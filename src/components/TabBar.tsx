import { ChartLine, Watch } from 'lucide-react';
import { usePlan } from '../state/plan';
import type { PlanState } from '../state/plan';

const TABS: { id: PlanState['view']; label: string; icon: typeof ChartLine }[] = [
  { id: 'profil', label: 'Høydeprofil', icon: ChartLine },
  { id: 'band', label: 'Armbåndskort', icon: Watch },
];

export function TabBar() {
  const { state, patch } = usePlan();
  const show = state.view === 'profil' || state.view === 'band';
  if (!show) {
    return <div className="tabs tabs-anchor" id="faner" />;
  }
  return (
    <div className="tabs" id="faner">
      <div className="tabs-in tabs-in--2" role="tablist" aria-label="Faner">
        {TABS.map((t) => {
          const Icon = t.icon;
          const on = state.view === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={t.label}
              className={on ? 'is-on' : ''}
              onClick={() => patch({ view: t.id })}
            >
              <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
