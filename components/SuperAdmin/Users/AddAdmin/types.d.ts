import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CitiesProps,
  CountriesProps,
  SelectOrganizationBranches,
  SelectOrganizationDepartments,
} from '@types';

export interface AddAdminProps {
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
}

export type useFormProps = [
  register: UseFormRegister<AddAdminProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<AddAdminProps>,
  loading: boolean,
  error: string,
  handleSelect: (
    type: string
  ) => (title: string | undefined, id: string | undefined) => void,
  selectors: SelectorsProps,
  branches: { loading: boolean; data: SelectOrganizationBranches[] },
  cities: { loading: boolean; data: CitiesProps[] },
  countries: { loading: boolean; data: CountriesProps[] },
  setDobValue: (value: Date | undefined | null) => void,
  validator: Suite,
  usernameStatus: UsernameStatus,
  handleUsernameChange: (username: string) => void,
  handlePhoneNumberChange: (phoneNumber: string) => void,
];

export type UsernameStatus = 'idle' | 'checking' | 'exists' | 'available';
