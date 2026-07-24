import type { PatientDoctorsProps } from '@types';

export type Props = {
  patient?: string;
  userType?: string;
};

export type TableProps = {
  data: PatientDoctorsProps[];
};
