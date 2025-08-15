import { BaseSyntheticEvent } from 'react';

import { MeasurementType } from '@types';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface TabletProps {
  title: string;
  serial_number: string;
  category?: MeasurementType | string;
}

export type UseFormProps = [
  register: UseFormRegister<TabletProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<TabletProps>,
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

export interface CreateTabletProps {
  data?: TabletProps & {
    id: string;
  };
}
