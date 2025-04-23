import type { PatientNursesProps } from '@types';

export type Props = {
  patient?: string;
};

export type TableProps = {
  data: Array<PatientNursesProps>;
};
