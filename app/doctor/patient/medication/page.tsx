'use client';

import { PatientMedication } from '@common';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <PatientMedication patient={searchParams?.patient?.toString() ?? ''} />
    </main>
  );
}
