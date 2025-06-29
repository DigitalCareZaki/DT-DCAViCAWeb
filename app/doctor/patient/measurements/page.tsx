'use client';

import { useUser } from '@selectors';
import { PatientMeasurements } from '@common';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps) {
  const [user] = useUser();

  const patient = searchParams?.patient?.toString();
  const type = searchParams?.type?.toString() || 'ALL';

  if (!patient) return <div>Patient not defined</div>;

  return (
    <main className="h-full w-full">
      <PatientMeasurements
        data={null}
        patient={patient}
        type={type}
        leftPadding={true}
        user={user}
      />
    </main>
  );
}
