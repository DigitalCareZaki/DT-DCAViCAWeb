import { getPatientMeasurements } from '@actions';

import { NursePatientMeasurements } from '@components';

import type { PageProps } from '@types';

export default async function Page({ searchParams }: PageProps) {
  const patient = searchParams?.patient?.toString();
  const type = searchParams?.type?.toString() || 'ALL';

  if (!patient) throw new Error('Patient not defined');

  const res = await getPatientMeasurements(patient, type);

  if (!res.success) return <></>;

  return (
    <main className="h-full w-full">
      <NursePatientMeasurements
        data={res.data}
        patient={patient}
        type={type}
        leftPadding={true}
      />
    </main>
  );
}
