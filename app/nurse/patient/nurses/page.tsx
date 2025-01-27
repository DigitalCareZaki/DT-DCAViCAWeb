import { Metadata } from 'next';
import { NursePatientNurses } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <NursePatientNurses patient={searchParams?.patient?.toString()} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Nurses',
  description: 'Avica | Patient Nurses',
};
