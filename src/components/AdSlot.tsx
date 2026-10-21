import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT } from '../lib/site';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  slot: string;
  className?: string;
};

/** Reservert høyde for å unngå layoutforskyvning. Maks tre per side – plassering styres av sidene. */
export function AdSlot({ slot, className = '' }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !ADSENSE_CLIENT || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* annonse blokkert */
    }
  }, []);

  if (!ADSENSE_CLIENT) return null;

  return (
    <aside className={`ad-slot ${className}`.trim()} aria-label="Annonse">
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 280 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
