import { ArticleView } from '../i18n/ArticleView';
import { articles } from '../i18n/articles';
import { usePreviewLocale } from '../state/previewLocale';

export function OmPage() {
  const { locale } = usePreviewLocale();
  return (
    <div id="om-siden">
      <ArticleView doc={articles.om[locale]} />
    </div>
  );
}
