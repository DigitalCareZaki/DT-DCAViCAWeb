import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface LoginProps {
  email: string;
  password: string;
}

export type useLoginProps = [
  register: UseFormRegister<LoginProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<LoginProps>,
  loading: boolean,
  validator: Suite,
];
