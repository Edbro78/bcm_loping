import { Helmet } from 'react-helmet-async';
import { canonicalUrl, type RouteMeta } from '../lib/site';

type Props = { meta: RouteMeta };

export function PageMeta({ meta }: Props) {
  const url = canonicalUrl(meta.path);
  const title = meta.path === '/' ? meta.title : `${meta.title} · BCM 2027`;
  const jsonLd =
    meta.schema === 'website'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: meta.title,
          url: canonicalUrl('/'),
          description: meta.description,
          inLanguage: 'nb',
        }
      : meta.schema === 'article'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            description: meta.description,
            url,
            inLanguage: 'nb',
            author: { '@type': 'Person', name: 'BCM løpeguide' },
          }
        : null;

  return (
    <Helmet>
      <html lang="nb" />
      <title>{title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={meta.schema === 'website' ? 'website' : 'article'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="nb_NO" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={meta.description} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
