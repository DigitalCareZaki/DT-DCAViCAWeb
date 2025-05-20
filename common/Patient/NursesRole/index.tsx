'use server';

import { getPatientNurses, getUserTypeHeaders } from '@actions';

import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const NursesPatient: ServerComponentProps<Props> = async ({
  patient,
}) => {
  if (!patient) throw new Error('Patient not define');

  const type = await getUserTypeHeaders();

  const res = await getPatientNurses(patient, undefined, type?.toLowerCase());

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={res.data} />
      <Form />
    </div>
  );
};

export default NursesPatient;
