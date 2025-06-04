'use server';

import { PageInfo } from '@common';
import { getPatientsSms } from '@service';

import Table from './Table';

import type { ServerComponent } from '@types';
type PatientNotificationProps = {
  patient: any; // Replace `any` with the proper type if you know it
};

const SmsPatients = async ({ patient }: PatientNotificationProps): Promise<JSX.Element> => {

  const res = await getPatientsSms(patient);


  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Table data={res.data ?? []} />
    </div>
  );
};

export default SmsPatients;
