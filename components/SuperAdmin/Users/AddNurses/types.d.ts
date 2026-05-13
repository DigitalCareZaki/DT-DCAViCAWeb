import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CitiesProps,
  CountriesProps,
  SelectOrganizationBranches,
  SelectOrganizationDepartments,
  SiteProps,
} from '@types';

export interface AddNurseProps {
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
  employee_id: string;
  Contract: string;
  department: string;
  avicardia_monitoring: string;
  site: string;
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
  avicardia_monitoring: {
    title: string | undefined;
    id: string | undefined;
  };
  site: {
    title: string | undefined;
    id: string | undefined;
  };
}

export type useFormProps = [
  register: UseFormRegister<AddNurseProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<AddNurseProps>,
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
  setDobValue: (value: Date | undefined | null) => void,
  validator: Suite,
  usernameStatus: UsernameStatus,
  handleUsernameChange: (username: string) => void,
  handlePhoneNumberChange: (phoneNumber: string) => void,
];

export type UsernameStatus = 'idle' | 'checking' | 'exists' | 'available';
