'use server';

import { PageInfo } from '@common';
import { getDoctorEmailsHistory } from '@service';

import Table from './Table';

import type { ServerComponent } from '@types';

const DoctorEmails = async ({ patient }: { patient: string }) => {
  const res = await getDoctorEmailsHistory(patient);

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Table data={res.data ?? []} />
    </div>
  );
};

export default DoctorEmails;
