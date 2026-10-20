import { scrollToId, usePlan } from '../state/plan';

export function Footer() {
  const { patch } = usePlan();
  return (
    <footer className="site">
      <div className="wrap">
        <p>
          Kilder: <a href="https://www.bergencitymarathon.no" target="_blank" rel="noopener">bergencitymarathon.no</a> (løypekart og deltakerinfo) og{' '}
          <a href="https://www.yr.no" target="_blank" rel="noopener">yr.no/met.no</a>.
        </p>
        <p>
          Uoffisiell planleggingsguide. Tempomodellen er en forenkling, og høydedata fra GPS støyer. Lytt til kroppen på løpsdagen – planen er et utgangspunkt, ikke en fasit.
        </p>
        <p>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              patch({ view: 'personvern' });
              window.setTimeout(() => scrollToId('personvern'), 40);
            }}
          >
            Personvernerklæring
          </button>
        </p>
      </div>
    </footer>
  );
}
