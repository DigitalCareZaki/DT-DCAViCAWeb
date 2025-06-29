'use client';

import { PatientNurses } from '@common';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <PatientNurses patient={searchParams?.patient?.toString()} />
    </main>
  );
}
