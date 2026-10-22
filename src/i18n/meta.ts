import type { RouteMeta } from '../lib/site';
import { ROUTES } from '../lib/site';
import type { Locale } from '../state/previewLocale';
import { ui } from './ui';

export function metaForPath(pathname: string, locale: Locale): RouteMeta {
  const base = ROUTES.find((r) => r.path === pathname);
  const loc = ui[locale].meta[pathname as keyof typeof ui.nb.meta];
  if (base && loc) {
    return { ...base, title: loc.title, description: loc.description };
  }
  if (base) return base;
  const fb = ui[locale].notFound;
  return {
    path: pathname,
    title: fb.h1,
    description: fb.intro,
    noAds: true,
    noAdScript: true,
    schema: 'none',
  };
}
