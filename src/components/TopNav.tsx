import { useEffect, useRef } from 'react';
import { usePlan, scrollToId } from '../state/plan';

const LINKS: { id: 'profil' | 'band' | 'kart' | 'om' | 'kontakt' | 'personvern'; label: string; anchor: string }[] = [
  { id: 'profil', label: 'Høydeprofil', anchor: 'faner' },
  { id: 'band', label: 'Armbåndskort', anchor: 'faner' },
  { id: 'kart', label: 'Kart', anchor: 'kart' },
  { id: 'om', label: 'Om siden', anchor: 'om-siden' },
  { id: 'kontakt', label: 'Kontakt oss', anchor: 'kontakt' },
  { id: 'personvern', label: 'Personvern', anchor: 'personvern' },
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
              fill="currentColor"
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
                const anchor = l.anchor;
                if (l.id === 'om' || l.id === 'kontakt' || l.id === 'personvern') window.setTimeout(() => scrollToId(anchor), 40);
                else requestAnimationFrame(() => scrollToId(anchor));
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
