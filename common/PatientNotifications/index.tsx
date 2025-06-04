'use server';

import { PageInfo } from '@common';
import { getPatientNotifications } from '@service';

import Table from './Table';
import type { ServerComponent } from '@types';

type PatientNotificationProps = {
  patient: any; // Replace `any` with the proper type if you know it
};

const PatientNotification = async ({ patient }: PatientNotificationProps): Promise<JSX.Element> => {

  const res = await getPatientNotifications(patient);

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
