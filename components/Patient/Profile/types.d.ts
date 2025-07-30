import type { BaseSyntheticEvent } from 'react';
import type { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { PatientProfileData } from '@types';

export interface PatientProps {
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: Date;
  uri: string;
  gender: Gender;
  title: Title;
  email: string;
  phone_number: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  emr: string;
  height: number;
  weight: number;
}

export interface SelectorProps {
  gender: {
    title: string | undefined;
  };
  title: {
    title: string | undefined;
  };
  profilePicture: undefined | string;
}

export type UseFormProps = [
  register: UseFormRegister<PatientProps>,
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void,
  FieldErrors<PatientProps>,
  loading: boolean,
  error: string,
  handleSelect: (type: string) => (title: string | undefined) => void,
  selectors: SelectorProps,
  handleFilePicker: (accept?: string) => void,
  setSelectors: React.Dispatch<React.SetStateAction<SelectorProps>>,
];
