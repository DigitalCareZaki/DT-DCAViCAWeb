'use server';

import Header from './Header';
import Table from './Table';

import { getTodayMedicationAlerts } from '@service';

import type { Props } from './types';
import type { ServerComponentProps } from '@types';

const PatientTodayMedications: ServerComponentProps<Props> = async ({
  patient,
}) => {
  if (!patient) throw new Error('Patient not defined');

  const res = await getTodayMedicationAlerts();

  if (!res.success) return <></>;

  return (
    <div className="flex w-full flex-col">
      <Header />
      <Table data={res.data} />
    </div>
  );
};

export default PatientTodayMedications;
