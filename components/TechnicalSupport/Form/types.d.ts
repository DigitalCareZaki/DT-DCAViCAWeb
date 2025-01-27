import { BaseSyntheticEvent } from 'react';

import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';

export interface TechnicalSupportProps {
  forgot_password: boolean;
  not_signing_up: boolean;
  can_not_find_anything: boolean;
  showing_errors: boolean;
  others: boolean;
  email: string;
  textarea: string;
}

export type UseFormProps = [
  register: UseFormRegister<TechnicalSupportProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<TechnicalSupportProps>,
  loading: boolean,
  watch: UseFormWatch<TechnicalSupportProps>,
  handleClick: (name: keyof TechnicalSupportProps) => void,
  handleCancel: () => void,
];
