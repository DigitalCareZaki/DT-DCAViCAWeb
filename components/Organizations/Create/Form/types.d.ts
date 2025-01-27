import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CitiesProps } from '@types';

export interface FormValuesProps {
  name: string;
  email: string;
  phone_number: string;
  city_id: string;
  address: string;
  website: string;
}

export type UseFormProps = () => [
  register: UseFormRegister<FormValuesProps>,
  onSubmit: any,
  errors: FieldErrors<FormValuesProps>,
  loading: boolean,
  handleFilePicker: () => void,
  uri: string | undefined,
  cities: CitiesProps[],
  selectedCity: CitiesProps | null,
  handleSelectCity: () => (name: string, id: string) => void,
];
