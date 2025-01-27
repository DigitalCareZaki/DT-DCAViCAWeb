import type { VLAllPatients, VLSinglePatientECG } from '@types';

export type Props = {
  data: VLAllPatients;
};

export type SelectedPatient = {
  name: string | undefined;
} & VLSinglePatientECG;

export type RenderPatientsProps = {
  patients: VLAllPatients;
  selectedPatient: SelectedPatient;
  handleSetSelectedPatient: (name: string) => void;
};
