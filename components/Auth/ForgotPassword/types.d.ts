import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface ValueProps {
  value: string;
}

export type UseFormProps = () => [
  register: UseFormRegister<ValueProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<ValueProps>,
  loading: boolean,
  enterOTP: boolean,
];
