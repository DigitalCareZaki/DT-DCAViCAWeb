import type { Metadata } from 'next';

import { Devices } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <Devices patient={searchParams?.patient?.toString() || null} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Device',
  description: 'Avica | Device',
};
