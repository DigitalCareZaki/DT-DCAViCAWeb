'use server';

import { PageInfo } from '@common';
import { getAllPatientsReports, getPatientEMRRecords } from '@service';
import Header from './Header';
import Table from './Table';
import type { ServerComponentProps } from '@types';
import type { EMRProps } from './types';
import { headers } from 'next/headers';

const EMR: ServerComponentProps<EMRProps> = async ({ patient_id }) => {

  let records: any = [];

  const getPatientReports = await getPatientEMRRecords(patient_id);
  if (getPatientReports.success) {
    records = getPatientReports.data;
  }

  const _headers = headers();
  const pathname = _headers.get('x-pathname') || '';
  const hideHeader = pathname.includes('/nurse/emr');

  return (
    <div className="hidescrollbar mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      {!hideHeader && <Header patient_id={patient_id || 'N/A'} />}
      <Table records={records} patient_id={patient_id} />
    </div>
  );
};

export default EMR;
