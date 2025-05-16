import { PatientNotification } from '@common';
import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {

  console.log('searchParams?.patient?.toString() >>>', searchParams?.patient?.toString());

  return (
    <main className="h-full w-full">
      <PatientNotification patient={searchParams?.patient?.toString()} />
    </main>
  );
}
