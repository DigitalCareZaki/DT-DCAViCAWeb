import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

import type { PatientMedicationProps, MedicationUnit } from '@types';

export type Props = {
  patient?: string;
  hideCreateMedicationBtn?: boolean;
};

export type TableProps = {
  data: PatientMedicationProps[];
};

export type CreateMedicationProps = {
  name: string;
  start: string;
  end: string;
  time: string;
  dosage: string;
  frequency: number;
  unit: MedicationUnit;
};

export interface SelectorProps {
  unit: MedicationUnit | undefined;
}

export type useFormProps = [
  register: UseFormRegister<CreateMedicationProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<CreateMedicationProps>,
  loading: boolean,
  handleSelectors: (type: string, value: string) => void,
  selectors: SelectorProps,
  error: string | undefined,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  searching: boolean,
  organizationMedicineResults: OrganizationMedicationProps[],
  currentMedicineName: string,
  handleSetCurrentMedicineName: (value: string) => void,
];
