'use server';

import { PageInfo } from '@common';
import { getAllPatientsReports, getPatientEMRRecords } from '@service';
import Header from './Header';
import Table from './Table';
import type { ServerComponentProps } from '@types';
import type { EMRProps } from './types';

const EMR: ServerComponentProps<EMRProps> = async ({ patient_id }) => {
  let records = [];

  if (!patient_id) {
    const getAllReports = await getAllPatientsReports();
    if (getAllReports.success) {
      records = getAllReports.data;
    }
  } else {
    const getPatientReports = await getPatientEMRRecords(patient_id);
    if (getPatientReports.success) {
      records = getPatientReports.data;
    }
  }

  return (
    <div className="hidescrollbar mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      {/* <Header patient_id={patient_id} />
      <Table records={res.data} /> */}
      <Header patient_id={patient_id || 'N/A'} />
      <Table records={records} />
    </div>
  );
};

export default EMR;
