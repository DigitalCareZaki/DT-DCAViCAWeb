import { BaseSyntheticEvent } from 'react';

import { MeasurementType } from '@types';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface TabletProps {
  title: string;
  serial_number: string;
  category?: MeasurementType | string;
  branch_id?: string; // Optional: only for superadmin selection
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
  selectors?: any,
  branches?: any
];

export interface SelectedValuesProps {
  [key: string]: {
    name: string | undefined;
    value: MeasurementType | undefined;
  };
}


export interface SelectorProps {
  priority: VideoPriority | undefined;
  category: VideoCategory | undefined;
  branch_id?: string; // Only for superadmin
}

export interface CreateTabletProps {
  data?: TabletProps & {
    id: string;
  };
}
