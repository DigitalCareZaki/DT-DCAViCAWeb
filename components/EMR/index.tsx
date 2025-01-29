'use server';

import { PageInfo } from '@common';

import { getPatientEMRRecords } from '@service';

import Header from './Header';
import Table from './Table';

import type { EMRRecordsProps, ServerComponentProps } from '@types';
import type { EMRProps } from './types';

const staticRecords: EMRRecordsProps[] = [
  {
    title: 'Static Record 1',
    uri: '/static/record1',
    created: '2025-01-01',
    family_history: 'No significant family history.',
    patient: {
      user: {
        first_name: 'John',
        last_name: 'Doe',
        middle_name: '',
        uri: '/static/john-doe',
        id: 'static-user-1',
      },
    },
  },
  {
    title: 'Static Record 2',
    uri: '/static/record2',
    created: '2025-01-05',
    family_history: 'History of diabetes in the family.',
    patient: {
      user: {
        first_name: 'Jane',
        last_name: 'Smith',
        middle_name: 'A',
        uri: '/static/jane-smith',
        id: 'static-user-2',
      },
    },
  },
];

const EMR: ServerComponentProps<EMRProps> = async ({ patient_id }) => {

  // const res = await getPatientEMRRecords(patient_id);

  // if (!res.success) return <></>;


  let records: EMRRecordsProps[];
  // Fetch records if patient_id exists, otherwise use static records
  if (patient_id) {
    const res = await getPatientEMRRecords(patient_id);
    if (!res.success) {
      // Handle fetch failure by showing an empty state or fallback
      return <></>;
    }
    records = res.data;
  } else {
    // Use static records when patient_id is not provided
    records = staticRecords;
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
