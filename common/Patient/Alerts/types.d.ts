import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

import type { MeasurementType } from '@types';

export type Props = {
  patient?: string;
};

export type CreatePatientReadingAlertProps = {
  type: MeasurementType;

  range_low_1: string;
  range_low_2: string;
  range_high_1: string;
  range_high_2: string;

  sms: boolean;
  email: boolean;
};

export interface SelectorsProps {
  type: MeasurementType | undefined;
}

export type useFormProps = [
  register: UseFormRegister<CreatePatientReadingAlertProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<CreatePatientReadingAlertProps>,
  loading: boolean,
  error: string | undefined,
  handleSelect: (type: string, val: string) => void,
  selectors: SelectorsProps,
  handleReset: () => void,
];
