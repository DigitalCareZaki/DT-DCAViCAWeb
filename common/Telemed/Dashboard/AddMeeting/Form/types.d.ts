import type { BaseSyntheticEvent } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { SearchTelemedResProps } from '@types';

export type UseFormProps = () => [
  register: UseFormRegister<AddAppointmentProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  errors: FieldErrors<AddAppointmentProps>,
  loading: boolean,
  handleSelectors: (type: string, value: string) => void,
  selectors: {
    type: string;
    about: string;
  },
  selectedTime: {
    startTime: Date | null;
    endTime: Date | null;
  },
  handleSelectTime: (startDate: Date, endDate: Date) => void,
  handleSearchUser: (query: string) => Promise<void>,
  searching: boolean,
  users: SearchTelemedResProps[],
  handleSelectUser: (user: SearchTelemedResProps) => void,
  selectedUsers: SearchTelemedResProps[],
];

interface AddAppointmentProps {
  title: string;
  description: string;
  about: string;
  type: string;
}
