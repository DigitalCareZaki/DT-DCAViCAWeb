'use client';
import { PatientContacts } from '@common';
// import { Metadata } from 'next';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <PatientContacts patient={searchParams?.patient?.toString() ?? ''} />
    </main>
  );
}

// export const metadata: Metadata = {
//   title: 'Avica | Patient Contacts',
//   description: 'Avica | Patient Contacts',
// };
