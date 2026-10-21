import { useEffect, useState, type ReactNode } from 'react';

/** Unngår SSR/hydration-feil for kart og andre browser-only flater. */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return <>{children}</>;
}
