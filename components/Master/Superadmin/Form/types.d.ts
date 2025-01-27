import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CitiesProps,
  CountriesProps,
  SelectOrganizationBranches,
  SelectOrganizationDepartments,
} from '@types';

export interface AddSuperAdminProps {
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
  organization: string;
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
  organization: {
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
  register: UseFormRegister<AddSuperAdminProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<AddSuperAdminProps>,
  loading: boolean,
  error: string,
  handleSelect: (
    type: string
  ) => (title: string | undefined, id: string | undefined) => void,
  selectors: SelectorsProps,
  organizations: { loading: boolean; data: SelectOrganizationBranches[] },
  cities: { loading: boolean; data: CitiesProps[] },
  countries: { loading: boolean; data: CountriesProps[] },
];
