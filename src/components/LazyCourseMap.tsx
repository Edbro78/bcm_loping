import { lazy, Suspense } from 'react';
import { useUi } from '../i18n/useUi';
import { usePreviewLocale } from '../state/previewLocale';
import { ClientOnly } from './ClientOnly';

const CourseMap = lazy(() => import('./CourseMap').then((m) => ({ default: m.CourseMap })));

export function LazyCourseMap() {
  const { locale } = usePreviewLocale();
  const mapLoading = useUi().common.mapLoading;
  return (
    <ClientOnly>
      <Suspense fallback={<p className="help wrap">{mapLoading}</p>}>
        <CourseMap key={locale} />
      </Suspense>
    </ClientOnly>
  );
}
