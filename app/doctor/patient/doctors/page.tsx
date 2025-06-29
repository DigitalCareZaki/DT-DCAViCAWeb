'use client';

import { PatientDoctors } from '@common';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <PatientDoctors patient={searchParams?.patient?.toString()} />
    </main>
  );
}
