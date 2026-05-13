import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BaseSyntheticEvent } from 'react';
import type { UserTitle, DoctorProfileProps } from '@types';

export type FormProps = {
  data: DoctorProfileProps;
};

export type ProfileCardProps = {
  uri: string | null;
  first_name: string;
  middle_name?: string;
  last_name: string;
  speciality: string;
  handleFileProps: (props: File) => void;
};

export type Props = {
  // speciality: string;
  // employeeId: string;
  title: UserTitle;
  institution: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  email: string;
  // npiNumber: string;
  phoneNumber: string;
  address: string;
  pmdcNumber: string;
  contractType: string;
  branch: string;
  siteName: string;
  // department: string;
};

export type useFormProps = [
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  register: UseFormRegister<Props>,
  FieldErrors<Props>,
  loading: boolean,
  error: string,
  handleProfilePicture: (props: File) => void,
  handlePhoneNumberChange: (phoneNumber: string) => void,
];
