import type { BaseSyntheticEvent, ChangeEvent } from 'react';
import type { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

export type UseFormProps = [
  register: UseFormRegister<AddEMRRecordProps>,
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void,
  FieldErrors<AddEMRRecordProps>,
  loading: boolean,
  handleSelecFile: (e: ChangeEvent<HTMLInputElement>) => void,
  selectedFile: undefined | File,
  handleRemoveFile: () => void,
];

export interface AddEMRRecordProps {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  file?: File;
}
