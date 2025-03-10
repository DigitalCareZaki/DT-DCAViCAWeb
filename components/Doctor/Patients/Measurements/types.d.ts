import type { PatientMeasurementProps } from '@types';

export type Props = {
  data: any;
  patient: string | null;
  type: string;
  hideActions?: boolean;
  leftPadding?: boolean;
};
