import { Metadata } from 'next';
import { NursesRoleWrapper } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <NursesRoleWrapper patient={searchParams?.patient?.toString()} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Nurses',
  description: 'Avica | Patient Nurses',
};
