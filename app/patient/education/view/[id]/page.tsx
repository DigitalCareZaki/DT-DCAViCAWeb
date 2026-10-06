import { Suspense } from 'react';
import type { Metadata } from 'next';

import { EducationDetail } from '@common';
import type { PageProps } from '@types';

export default function Page(props: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <Suspense>
        <EducationDetail id={props?.params?.id?.toString()} />
      </Suspense>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Education',
  description: 'Avica | Patient Education',
};
