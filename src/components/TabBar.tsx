import { Timer, ChartLine, Table2, Flag, Watch } from 'lucide-react';
import { usePlan } from '../state/plan';
import type { PlanState } from '../state/plan';

const TABS: { id: PlanState['view']; label: string; icon: typeof Timer }[] = [
  { id: 'plan', label: 'Tempoplan', icon: Timer },
  { id: 'profil', label: 'Høydeprofil', icon: ChartLine },
  { id: 'splits', label: 'Mellomtider', icon: Table2 },
  { id: 'mile', label: 'Milepæler', icon: Flag },
  { id: 'band', label: 'Armbåndskort', icon: Watch },
];

export function TabBar() {
  const { state, patch } = usePlan();
  return (
    <div className="tabs" id="faner">
      <div className="tabs-in" role="tablist" aria-label="Faner">
        {TABS.map((t) => {
          const Icon = t.icon;
          const on = state.view === t.id;
          return (
            <button key={t.id} type="button" role="tab" aria-selected={on} className={on ? 'is-on' : ''} onClick={() => patch({ view: t.id })}>
              <Icon size={18} strokeWidth={1.75} />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
