import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CitiesProps,
  CountriesProps,
  SelectOrganizationBranches,
  SelectUserProps,
  SiteProps,
} from '@types';

export interface AddPatientProps {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  username: string;
  weight: string;
  height: string;
  gender: string;
  title: string;
  country: string;
  city: string;
  branch: string;
  dob: string;
  address: string;
  Nextofkin: string;
  nurse: string;
  site: string;
  doctor: string;
  cardiac_monitoring: string;
}

export interface SelectorsProps {
  gender: {
    title: string | undefined;
    id: string | undefined;
  };
  title: {
    title: string | undefined;
    id: string | undefined;
  };
  branch: {
    title: string | undefined;
    id: string | undefined;
  };
  country: {
    title: string | undefined;
    id: string | undefined;
  };
  city: {
    title: string | undefined;
    id: string | undefined;
  };
  doctor: {
    title: string | undefined;
    id: string | undefined;
  };
  nurse: {
    title: string | undefined;
    id: string | undefined;
  };
  site: {
    title: string | undefined;
    id: string | undefined;
  };
  cardiac_monitoring: {
    title: string | undefined;
    id: string | undefined;
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

export type UsernameStatus = 'idle' | 'checking' | 'exists' | 'available';

export type useFormProps = [
  register: UseFormRegister<AddPatientProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  errors: FieldErrors<AddPatientProps>,
  loading: boolean,
  error: string,
  handleSelect: (
    type: string
  ) => (title: string | undefined, id: string | undefined) => void,
  selectors: SelectorsProps,
  branches: { loading: boolean; data: SelectOrganizationBranches[] },
  cities: { loading: boolean; data: CitiesProps[] },
  countries: { loading: boolean; data: CountriesProps[] },
  nurses: { loading: boolean; data: SelectUserProps[] },
  sites: { loading: boolean; data: SiteProps[] },
  doctors: { loading: boolean; data: SelectUserProps[] },
  setDobValue: (value: Date | undefined | null) => void,
  validator: any,
  currentStep: LoadingStep,
  getLoadingStepInfo: (step: LoadingStep) => LoadingStepInfo,
  usernameStatus: UsernameStatus,
  handleUsernameChange: (username: string) => void,
];
