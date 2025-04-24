'use server';

import { getPatientDoctors, getUserTypeHeaders } from '@actions';

import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const DoctorPatientDoctors: ServerComponentProps<Props> = async ({
  patient,
}) => {
  if (!patient) throw new Error('Patient id not define');

  const type = await getUserTypeHeaders();
  const data = await getPatientDoctors(patient, undefined, type?.toLowerCase());

  if (!data.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={data?.data} />
      <Form />
    </div>
  );
};

export default DoctorPatientDoctors;
