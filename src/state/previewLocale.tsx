import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/** iPhone 18 logical viewport (CSS px) for editor preview. */
export const IPHONE_18_WIDTH = 404;
export const IPHONE_18_HEIGHT = 874;

export type DevicePreview = 'desktop' | 'mobile';
export type Locale = 'nb' | 'en';

type PreviewLocaleState = {
  device: DevicePreview;
  locale: Locale;
  setDevice: (d: DevicePreview) => void;
  setLocale: (l: Locale) => void;
};

const PreviewLocaleContext = createContext<PreviewLocaleState | null>(null);

const STORAGE_DEVICE = 'bcm-preview-device';
const STORAGE_LOCALE = 'bcm-preview-locale';

function readDevice(): DevicePreview {
  try {
    return localStorage.getItem(STORAGE_DEVICE) === 'mobile' ? 'mobile' : 'desktop';
  } catch {
    return 'desktop';
  }
}

function readLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_LOCALE) === 'en' ? 'en' : 'nb';
  } catch {
    return 'nb';
  }
}

/** Eier-verktøy: dev, VITE_OWNER_TOOLS=true, eller localStorage bcm-owner=1 */
export function showOwnerTools(): boolean {
  try {
    const env = import.meta.env;
    if (env?.DEV) return true;
    if (env?.VITE_OWNER_TOOLS === 'true') return true;
  } catch {
    /* SSR / prerender */
  }
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('bcm-owner') === '1';
  } catch {
    return false;
  }
}

export function PreviewLocaleProvider({ children }: { children: ReactNode }) {
  const [device, setDeviceState] = useState<DevicePreview>(() => readDevice());
  const [locale, setLocaleState] = useState<Locale>(() => readLocale());

  const setDevice = (d: DevicePreview) => {
    setDeviceState(d);
    try {
      localStorage.setItem(STORAGE_DEVICE, d);
    } catch {
      /* ignore */
    }
  };

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_LOCALE, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('preview-mobile', device === 'mobile');
    document.documentElement.lang = locale === 'en' ? 'en' : 'nb';
    document.documentElement.dataset.locale = locale;
  }, [device, locale]);

  const value = useMemo(
    () => ({ device, locale, setDevice, setLocale }),
    [device, locale],
  );

  return <PreviewLocaleContext.Provider value={value}>{children}</PreviewLocaleContext.Provider>;
}

export function usePreviewLocale(): PreviewLocaleState {
  const ctx = useContext(PreviewLocaleContext);
  if (!ctx) throw new Error('usePreviewLocale outside PreviewLocaleProvider');
  return ctx;
}
