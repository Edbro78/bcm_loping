import { lazy, Suspense } from 'react';
import { ClientOnly } from './ClientOnly';

const CourseMap = lazy(() => import('./CourseMap').then((m) => ({ default: m.CourseMap })));

export function LazyCourseMap() {
  return (
    <ClientOnly>
      <Suspense fallback={<p className="help wrap">Kart lastes…</p>}>
        <CourseMap />
      </Suspense>
    </ClientOnly>
  );
}
