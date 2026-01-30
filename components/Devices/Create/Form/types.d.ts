import { BaseSyntheticEvent } from 'react';

import { MeasurementType } from '@types';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface DeviceProps {
  title: string;
  description: string | null;
  serial_number: string;
  category: MeasurementType;
  cardiac_monitoring: 'YES' | 'NO' | 'LATER' | null;
  site_id?: string;
  // Optional branch for SUPERADMIN create flow
  branch_id?: string;
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
    value: MeasurementType | string | undefined;
  };
}

// Loading step types
export type LoadingStep =
  | 'idle'
  | 'validating'
  | 'preparing'
  | 'submitting'
  | 'processing'
  | 'syncing'
  | 'success'
  | 'error';

export interface LoadingStepInfo {
  step: LoadingStep;
  title: string;
  description: string;
  progress: number;
}

export type UseFormProps = [
  register: UseFormRegister<DeviceProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  errors: FieldErrors<DeviceProps>,
  loading: boolean,
  selectedValues: SelectedValuesProps,
  setValue: any,
  handleSelect: (name: string, value: string) => void,
  handleSelectByAbd: (name: string, value: string) => void,
  serials: string[],
  setSelectedSerial: (s: string) => void,
  selectedSerial: string,
  selectors: any,
  branches: any[],
  handleSelectBranch: (id: string) => void,
  setSelectedValues: any,
  sites: any[],
  handleSelectSite: (id: string) => void,
  currentStep: LoadingStep,
  getLoadingStepInfo: (step: LoadingStep) => LoadingStepInfo,
];

export interface CreateDeviceProps {
  data?: DeviceProps & {
    id: string;
  };
}

