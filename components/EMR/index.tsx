'use server';

import { PageInfo } from '@common';

import { getPatientEMRRecords } from '@service';

import Header from './Header';
import Table from './Table';

import type { ServerComponentProps } from '@types';
import type { EMRProps } from './types';

const EMR: ServerComponentProps<EMRProps> = async ({ patient_id }) => {
  const res = await getPatientEMRRecords(patient_id);

  if (!res.success) return <></>;

  return (
    <div className="hidescrollbar mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Header patient_id={patient_id} />
      <Table records={res.data} />
    </div>
  );
};

export default EMR;
