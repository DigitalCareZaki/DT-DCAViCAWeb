import type { VLAllPatients, VLSinglePatientECG } from '@types';

export type Props = {
  data: VLAllPatients;
  avicaPatients?: any[];
  pagination?: {
    totalItems: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
};

export type SelectedPatient = {
  name: string | undefined;
  selectedPatch?: string;
} & VLSinglePatientECG;

export type RenderPatientsProps = {
  patients: VLAllPatients;
  selectedPatient: SelectedPatient;
  handleSetSelectedPatient: (name: string, patchSn?: string) => void;
};
