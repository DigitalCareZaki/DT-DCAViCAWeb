import type { Metadata } from 'next';

import { DoctorDevices } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorDevices patient={searchParams?.patient?.toString() ?? ''} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Device',
  description: 'Avica | Device',
};
