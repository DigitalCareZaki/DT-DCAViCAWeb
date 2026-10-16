import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

import type {
  PatientMeasurementProps,
  MeasurementType,
  MeasurementMode,
  MeasurementUnit,
  UserProps,
} from '@types';

export type MeasurementCardType = MeasurementType | 'ALL';

export type Props = {
  data: any;
  patient: string | null;
  type: string;
  fullHeight?: boolean;
  leftPadding?: boolean;
  user: UserProps;
  hideActions?: boolean;
};

export type BannerProps = {
  patient: string | null;
  type: string;
};

export type CardProps = {
  id: MeasurementCardType;
  title: string;
  Icon: JSX.Element;
  patient: string | null;
  type: sting;
  userType?: string;
};

export type TableProps = {
  data: any;
  user: UserProps;
};

export type CreateMeasurementProps = {
  title: string;
  type: MeasurementType;
  mode: MeasurementMode;
  unit: MeasurementUnit;
  value1: string;
  value2: string | undefined;
};

export interface SelectorsProps {
  type: MeasurementType | undefined;
  mode: MeasurementMode | undefined;
  unit: MeasurementUnit | undefined;
}

export type useFormProps = [
  register: UseFormRegister<CreateMeasurementProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<CreateMeasurementProps>,
  loading: boolean,
  error: undefined | string,
  handleSelect: (type: string) => (val: string) => void,
  selectors: SelectorsProps,
  reset: () => void,
];

export type RenderUnitAndValueProps = {
  register: UseFormRegister<CreateMeasurementProps>;
  errors: FieldErrors<CreateMeasurementProps>;
  selectors: SelectorsProps;
};
