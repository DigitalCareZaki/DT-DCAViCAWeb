import { Suspense } from 'react';
import type { Metadata } from 'next';

import {
  EducationLeftBarSkeleton,
  EducationLeftBar,
  EducationRightBar,
  EducationRightBarSkeleton,
  EducationContent,
  EducationContentSkeleton,
} from '@common';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-6 pt-6">
        <div className="flex w-full items-start gap-6">
          <Suspense fallback={<EducationLeftBarSkeleton />}>
            <EducationLeftBar />
          </Suspense>
          <Suspense fallback={<EducationContentSkeleton />}>

            <EducationContent />

          </Suspense>
          <Suspense fallback={<EducationRightBarSkeleton />}>
            <EducationRightBar />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor Education',
  description: 'Avica | Doctor Education',
};
