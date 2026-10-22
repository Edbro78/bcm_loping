import { ArticleView } from '../i18n/ArticleView';
import { articles } from '../i18n/articles';
import { usePreviewLocale } from '../state/previewLocale';

export function TempoplanPage() {
  const { locale } = usePreviewLocale();
  return <ArticleView doc={articles.tempoplan[locale]} />;
}
