import { DoctorPatientMeasurements } from '@components';

import { allPatientsMeasurements } from '@service';

import type { PageProps } from '@types';

export default async function Page({ searchParams }: PageProps) {

  const type = searchParams?.type?.toString() || 'ALL';
  const page = parseInt(searchParams?.page as string) || 1;
  const pageSize = parseInt(searchParams?.pageSize as string) || 10;

  const res = await allPatientsMeasurements(type, page, pageSize);

  if (!res.success) return <></>;

  return (
    <main className="h-full w-full">
      <DoctorPatientMeasurements
        data={res.data}
        patient={null}
        type={type}
        hideActions
      />
    </main>
  );
}
