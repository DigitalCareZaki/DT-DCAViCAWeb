import { BaseSyntheticEvent } from 'react';

import { MeasurementType } from '@types';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface DeviceProps {
  title: string;
  description: string | null;
  serial_number: string;
  category: MeasurementType;
}

export type UseFormProps = [
  register: UseFormRegister<DeviceProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<DeviceProps>,
  loading: boolean,
  selectedValues: SelectedValuesProps,
  handleSelect: (name: string, value: string) => void,
];

export interface SelectedValuesProps {
  [key: string]: {
    name: string | undefined;
    value: MeasurementType | undefined;
  };
}

export interface CreateDeviceProps {
  data?: DeviceProps & {
    id: string;
  };
}
