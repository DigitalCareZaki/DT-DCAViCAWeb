'use server';

import Header from './Home/Header';
import Table from './Home/Table';

import { getUser, getDevices, getAllDevicesForPatient } from '@service';

import type { Props } from './types';
import type { ServerComponentProps } from '@types';

const DoctorDevices: ServerComponentProps<Props> = async ({ patient }: any) => {
  const user = await getUser();

  if (!user?.role) return <></>;

  const res = patient
    ? await getAllDevicesForPatient(patient)
    : await getDevices();

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col px-10 pr-0 pt-6">
      <Header userRole={user.role?.toLowerCase()} data={res.data} patientId={patient} />
      <Table userRole={user.role?.toLowerCase()} data={res.data} />
    </div>
  );
};

export default DoctorDevices;
