import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export type Props = {
  patient: string | undefined;
};

export type CreateContactProps = {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  responseError: string;
};

export type useFormProps = [
  register: UseFormRegister<CreateContactProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<CreateContactProps>,
  loading: boolean,
  error: string,
];
