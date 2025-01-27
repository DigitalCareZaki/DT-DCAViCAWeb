import { DoctorPatientDoctors } from '@components';
import { Metadata } from 'next';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorPatientDoctors patient={searchParams?.patient?.toString()} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Doctors',
  description: 'Avica | Patient Doctors',
};
