import { Helmet } from 'react-helmet-async';
import { ADSENSE_CLIENT } from '../lib/site';

/** AdSense i head – kompatibelt med Googles sertifiserte CMP (Privacy & messaging). */
export function AdHead() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <Helmet>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
    </Helmet>
  );
}
