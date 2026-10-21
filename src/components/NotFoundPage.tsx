import { Link } from 'react-router-dom';
import { PageMeta } from './PageMeta';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import { metaForPath } from '../lib/site';

export function NotFoundPage() {
  const meta = metaForPath('/404');
  return (
    <>
      <PageMeta meta={meta} />
      <TopNav />
      <main id="innhold">
      <article className="about wrap">
        <div className="about-in">
          <h1>Siden finnes ikke</h1>
          <p className="intro">
            Lenken kan være gammel, eller adressen er skrevet feil. Bruk menyen over, eller gå tilbake til forsiden.
          </p>
          <p>
            <Link to="/">Til forsiden</Link>
          </p>
        </div>
      </article>
      <Footer />
      </main>
    </>
  );
}
