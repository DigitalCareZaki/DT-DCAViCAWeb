'use server';

import { PatientProfile } from '@common';

import type { PageProps, ServerComponentProps } from '@types';

const PatientProfileWrapper: ServerComponentProps<PageProps> = async ({
  searchParams,
}) => {
  return (
    <main className="h-full w-full">
      <PatientProfile patient={searchParams?.patient?.toString()} />
    </main>
  );
};

export default PatientProfileWrapper;

export type Props = {
  patient: string | undefined;
};
