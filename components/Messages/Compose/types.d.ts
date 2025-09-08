import type { MessageSearchUserProps } from '@types';
import type { BaseSyntheticEvent, ChangeEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface MessageComposeProps {
  send_to: string;
  subject: string;
  content: string;
  attachments: (string | File)[];
}

export type UseFormProps = [
  register: UseFormRegister<MessageComposeProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<MessageComposeProps>,
  loading: boolean,
  handleChangeEditorValue: (value: string) => void,
  defaultContent?: string,
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void,
  searching: boolean,
  users: MessageSearchUserProps[],
  handleSelectUser: (value: string) => void,
  selectedUser: string,
];
