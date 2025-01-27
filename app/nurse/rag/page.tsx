import { NursePatientMeasurements } from '@components';

import { allPatientsMeasurements } from '@service';

import type { PageProps } from '@types';

export default async function Page({ searchParams }: PageProps) {
  const type = searchParams?.type?.toString() || 'ALL';
  const res = await allPatientsMeasurements(type);

  if (!res.success) return <></>;

  return (
    <main className="h-full w-full">
      <NursePatientMeasurements
        data={res.data}
        patient={null}
        type={type}
        hideActions
      />
    </main>
  );
}
