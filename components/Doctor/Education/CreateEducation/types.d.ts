import type { BaseSyntheticEvent, ChangeEvent } from 'react';
import type { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

export interface CreateArticleProps {
  title: string;
  content: string;
  references: string[];
}

export type UseFormProps = [
  register: UseFormRegister<CreateArticleProps>,
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void,
  FieldErrors<CreateArticleProps>,
  loading: boolean,
  handlePushReference: () => void,
  references: string[],
  handleReferenceValue: (e: ChangeEvent<HTMLInputElement>) => void,
  referenceValue: string | undefined,
  handlePopReference: (pos: number) => void,
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
  selectedFile: undefined | File,
];
