'use server';

import { getPatientNurses, getUserTypeHeaders } from '@actions';
import { getPatientAppointments } from '@service';
import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const TelemedicineNurses: ServerComponentProps<any> = async ({
  patient,
}) => {
  if (!patient) throw new Error('Patient not define');

  const type = await getUserTypeHeaders();
  const res = await getPatientAppointments(patient, 1, 10);

  if (!res.success) return <></>;

  console.log('res getPatientAppointments >>>', res?.data);


  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={res?.data} patient={patient} />
      <Form />
    </div>
  );
};

export default TelemedicineNurses;
