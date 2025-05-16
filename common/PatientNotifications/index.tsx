'use server';

import { PageInfo } from '@common';
import { getPatientNotifications } from '@service';

import Table from './Table';
import type { ServerComponent } from '@types';

const PatientNotification: any = async ({ patient }: any) => {

  console.log('PatientNotification component >>>', patient);


  const res = await getPatientNotifications(patient);
  console.log(' patient res', res);

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      {/* <Header /> */}
      <Table data={res.data ?? []} />
    </div>
  );
};

export default PatientNotification;
