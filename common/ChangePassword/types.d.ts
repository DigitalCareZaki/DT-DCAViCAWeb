import type { BaseSyntheticEvent } from 'react';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Suite } from 'vest';

export type Props = {
  password: string;
  repeatPassword: string;
};

export type useFormProps = [
  register: UseFormRegister<Props>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<Props>,
  loading: boolean,
  validator: Suite,
];
