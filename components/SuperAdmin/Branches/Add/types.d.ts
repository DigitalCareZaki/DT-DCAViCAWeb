import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CountriesProps, CitiesProps } from '@types';

export interface AddBranchProps {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export interface SelectorsProps {
  country: {
    title: string | undefined;
    id: string | undefined;
  };
  city: {
    title: string | undefined;
    id: string | undefined;
  };
}

export type useFormHookProps = [
  register: UseFormRegister<AddBranchProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<AddBranchProps>,
  loading: boolean,
  handleSelect: (
    type: string
  ) => (title: string | undefined, id: string | undefined) => void,
  selectors: SelectorsProps,
  countries: { loading: boolean; data: CountriesProps[] },
  cities: { loading: boolean; data: CitiesProps[] },
];
