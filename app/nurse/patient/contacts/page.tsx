import type { Metadata } from 'next';
import { NursePatientContacts } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <NursePatientContacts patient={searchParams?.patient?.toString()} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Contacts',
  description: 'Avica | Patient Contacts',
};
