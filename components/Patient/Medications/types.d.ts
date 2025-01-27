import type { PatientMedicationAlert } from '@types';

export type Props = {
  patient: string;
};

export type TableProps = {
  data: PatientMedicationAlert[];
};
