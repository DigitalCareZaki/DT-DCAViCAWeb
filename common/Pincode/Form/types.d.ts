import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BaseSyntheticEvent } from 'react';

export interface FormProps {
  password: string;
  pincode: string;
}

export type UseFormHookProps = (onClose?: () => void) => [
  UseFormRegister<FormProps>,
  (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  FieldErrors<FormProps>,
  boolean,
];