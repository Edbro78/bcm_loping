import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <p className="independence">
          Dette er en uavhengig løperguide. Den er ikke tilknyttet TIF Viking, Bergen City Marathon eller løpets sponsorer. For påmelding og offisiell informasjon, bruk{' '}
          <a href="https://www.bergencitymarathon.no" target="_blank" rel="noopener">
            bergencitymarathon.no
          </a>
          .
        </p>
        <p>
          Kilder til kart og program:{' '}
          <a href="https://www.bergencitymarathon.no" target="_blank" rel="noopener">
            bergencitymarathon.no
          </a>{' '}
          og{' '}
          <a href="https://www.yr.no" target="_blank" rel="noopener">
            yr.no / met.no
          </a>
          . Tempomodellen er forenklet; høydedata fra GPS kan avvike. Planen er et utgangspunkt – kroppen på løpsdagen er fasit.
        </p>
        <p className="footer-links">
          <Link to="/om">Om siden</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/personvern">Personvern</Link>
        </p>
      </div>
    </footer>
  );
}
