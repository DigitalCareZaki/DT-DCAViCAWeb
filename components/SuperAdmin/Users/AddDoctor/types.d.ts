import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CitiesProps,
  CountriesProps,
  SelectOrganizationBranches,
  SelectOrganizationDepartments,
  SiteProps,
} from '@types';

export interface AddDoctorProps {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  username: string;
  gender: string;
  title: string;
  country: string;
  city: string;
  branch: string;
  dob: string;
  address: string;
  npi_number: string;
  Institute: string;
  Contract: string;
  employee_id: string;
  pmdc_number: string;
  department: string;
  site: string;
  avicardia_monitoring: string;
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
  department: {
    title: string | undefined;
    id: string | undefined;
  };
  site: {
    title: string | undefined;
    id: string | undefined;
  };
  avicardia_monitoring: {
    title: string | undefined;
    id: string | undefined;
  };
}

export type useFormProps = [
  register: UseFormRegister<AddDoctorProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<AddDoctorProps>,
  loading: boolean,
  error: string,
  handleSelect: (
    type: string
  ) => (title: string | undefined, id: string | undefined) => void,
  selectors: SelectorsProps,
  branches: { loading: boolean; data: SelectOrganizationBranches[] },
  cities: { loading: boolean; data: CitiesProps[] },
  countries: { loading: boolean; data: CountriesProps[] },
  departments: { loading: boolean; data: SelectOrganizationDepartments[] },
  sites: { loading: boolean; data: SiteProps[] },
  validator: Suite,
  currentStep: LoadingStep,
  getLoadingStepInfo: (step: LoadingStep) => LoadingStepInfo,
];

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
