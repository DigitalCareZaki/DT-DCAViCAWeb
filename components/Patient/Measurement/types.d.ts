import type { PatientMeasurementProps } from '@types';

export type Props = {
  data: PatientMeasurementProps[];
  patient: string | null;
  type: string;
  hideActions?: boolean;
  leftPadding?: boolean;
};
