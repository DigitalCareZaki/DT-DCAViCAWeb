import { DoctorPatientNurses } from '@components';
import { Metadata } from 'next';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorPatientNurses patient={searchParams?.patient?.toString()} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Nurses',
  description: 'Avica | Patient Nurses',
};
