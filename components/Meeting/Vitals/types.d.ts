import type { MeasurementValuesProps } from '@types';

export interface Props {
  data: MeasurementValuesProps[];
  appointmentId?: string;
}

export interface LevelsProps {
  data: MeasurementValuesProps[];
}

export interface ServerWrapperProps {
  id: string;
}
