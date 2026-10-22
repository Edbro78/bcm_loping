import { Link } from 'react-router-dom';
import { PageMeta } from './PageMeta';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import { metaForPath } from '../i18n/meta';
import { useUi } from '../i18n/useUi';
import { usePreviewLocale } from '../state/previewLocale';

export function NotFoundPage() {
  const { locale } = usePreviewLocale();
  const nf = useUi().notFound;
  const meta = metaForPath('/404', locale);
  return (
    <>
      <PageMeta meta={meta} />
      <TopNav />
      <main id="innhold">
        <article className="about wrap">
          <div className="about-in">
            <h1>{nf.h1}</h1>
            <p className="intro">{nf.intro}</p>
            <p>
              <Link to="/">{nf.home}</Link>
            </p>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
