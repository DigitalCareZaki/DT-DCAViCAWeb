import type { Metadata } from 'next';

import { NurseDevices } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <NurseDevices patient={searchParams?.patient?.toString() || null} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Device',
  description: 'Avica | Device',
};
