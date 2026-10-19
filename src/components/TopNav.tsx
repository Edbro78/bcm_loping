import { useEffect, useRef } from 'react';
import { usePlan, scrollToId } from '../state/plan';

const LINKS: { id: 'plan' | 'profil' | 'splits' | 'mile' | 'band' | 'kart'; label: string; anchor: string }[] = [
  { id: 'plan', label: 'Tempoplan', anchor: 'faner' },
  { id: 'profil', label: 'Høydeprofil', anchor: 'faner' },
  { id: 'splits', label: 'Mellomtider', anchor: 'faner' },
  { id: 'mile', label: 'Milepæler', anchor: 'faner' },
  { id: 'band', label: 'Armbåndskort', anchor: 'faner' },
  { id: 'kart', label: 'Kart', anchor: 'kart' },
];

export function TopNav() {
  const { state, patch } = usePlan();
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const apply = () => document.documentElement.style.setProperty('--nav-h', `${el.offsetHeight}px`);
    apply();
    const watch = new ResizeObserver(apply);
    watch.observe(el);
    return () => watch.disconnect();
  }, []);
  return (
    <header className="nav" ref={navRef}>
      <div className="nav-in">
        <a
          className="brand"
          href="#innhold"
          onClick={(e) => {
            e.preventDefault();
            scrollToId('innhold');
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="#B3322A"
              d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C15.8 12 17.8 13 20 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"
            />
          </svg>
          <span>BCM 2027</span>
        </a>
        <nav className="nav-links" aria-label="Innhold">
          {LINKS.map((l) => (
            <button
              key={l.label}
              type="button"
              className={l.id !== 'kart' && state.view === l.id ? 'is-on' : ''}
              onClick={() => {
                if (l.id === 'kart') patch({ view: 'profil' });
                else patch({ view: l.id });
                requestAnimationFrame(() => scrollToId(l.anchor));
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="seg compact" role="group" aria-label="Distanse">
          <button type="button" aria-pressed={state.dist === 'half'} onClick={() => patch({ dist: 'half' })}>
            Halv
          </button>
          <button type="button" aria-pressed={state.dist === 'full'} onClick={() => patch({ dist: 'full' })}>
            Hel
          </button>
        </div>
      </div>
    </header>
  );
}
