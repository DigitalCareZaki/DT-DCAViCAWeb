import type { Metadata } from 'next';

import { NursePatientDoctors } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <NursePatientDoctors patient={searchParams?.patient?.toString()} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Doctors',
  description: 'Avica | Patient Doctors',
};
