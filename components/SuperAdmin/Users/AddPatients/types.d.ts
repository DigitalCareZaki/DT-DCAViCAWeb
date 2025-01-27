import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type {
  CitiesProps,
  CountriesProps,
  SelectOrganizationBranches,
  SelectUserProps,
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
  doctor: string;
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
}

export type useFormProps = [
  register: UseFormRegister<AddPatientProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<AddPatientProps>,
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
  doctors: { loading: boolean; data: SelectUserProps[] },
  validator: Suite,
];
