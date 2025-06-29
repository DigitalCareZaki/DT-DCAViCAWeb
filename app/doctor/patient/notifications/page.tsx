"use client"
import { PatientNotification } from '@common';
import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {

  return (
    <main className="h-full w-full">
      <PatientNotification patient={searchParams?.patient?.toString() ?? ''} />
    </main>
  );
}
