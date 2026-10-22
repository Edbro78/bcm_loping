import { usePreviewLocale, type Locale } from '../state/previewLocale';
import { ui } from './ui';

export function useUi() {
  const { locale } = usePreviewLocale();
  return ui[locale];
}

export function uiFor(locale: Locale) {
  return ui[locale];
}
