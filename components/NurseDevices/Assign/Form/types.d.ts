import { BaseSyntheticEvent, ChangeEvent } from 'react';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export type UseFormProps = [
  register: UseFormRegister<AssignPatientDevice>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<>,
  loading: boolean,
  handleSearchPatients: (e: ChangeEvent<HTMLInputElement>) => void,
  searching: boolean,
  searchResults: PatientData[],
  selectedPatients: PatientData[],
  handleSelectPatient: (patient: PatientData) => void,
  handleRemovePatient: (patient: PatientData) => void,
];

export interface PatientData {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
}

export interface AllPatientsRes {
  success: boolean;
  data: PatientData[];
}

export interface AssignPatientDevice {
  device_id: string;
  patient_ids: string[];
}
