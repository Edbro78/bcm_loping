import { Outlet, useLocation } from 'react-router-dom';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import { PageMeta } from './PageMeta';
import { AdHead } from './AdHead';
import { metaForPath } from '../lib/site';

export function SiteLayout() {
  const { pathname } = useLocation();
  const meta = metaForPath(pathname);
  return (
    <>
      <PageMeta meta={meta} />
      {!meta.noAdScript && <AdHead />}
      <a className="skip" href="#innhold">
        Hopp til innhold
      </a>
      <TopNav />
      <main id="innhold">
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
