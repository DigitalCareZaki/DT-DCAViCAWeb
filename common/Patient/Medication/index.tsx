'use server';

import { getPatientMedications } from '@actions';

import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Medication: ServerComponentProps<Props> = async ({
  patient,
  hideCreateMedicationBtn,
}) => {
  if (!patient) throw new Error('Patient not define');

  const res = await getPatientMedications(patient, undefined);

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header
        hideCreateMedicationBtn={hideCreateMedicationBtn}
        data={res?.data}
      />
      <Table data={res.data} />
      <Form />

    </div>
  );
};

export default Medication;
