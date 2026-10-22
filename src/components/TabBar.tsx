import { ChartLine, Watch } from 'lucide-react';
import { useUi } from '../i18n/useUi';
import { usePlan } from '../state/plan';
import type { PlanState } from '../state/plan';

const TAB_IDS: PlanState['view'][] = ['profil', 'band'];
const TAB_ICONS = [ChartLine, Watch] as const;

export function TabBar() {
  const { state, patch } = usePlan();
  const m = useUi();
  const labels = [m.tabBar.profil, m.tabBar.band];
  const show = state.view === 'profil' || state.view === 'band';
  if (!show) {
    return <div className="tabs tabs-anchor" id="faner" />;
  }
  return (
    <div className="tabs" id="faner">
      <div className="tabs-in tabs-in--2" role="tablist" aria-label={m.tabBar.tablist}>
        {TAB_IDS.map((id, i) => {
          const Icon = TAB_ICONS[i]!;
          const label = labels[i]!;
          const on = state.view === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={label}
              className={on ? 'is-on' : ''}
              onClick={() => patch({ view: id })}
            >
              <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
