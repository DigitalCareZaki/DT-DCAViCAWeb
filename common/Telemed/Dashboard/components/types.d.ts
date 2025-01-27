import type { RequestedAppointmentProps } from '@types';

export interface Appointment extends RequestedAppointmentProps {
  className?: string;
  dynamicWidth?: boolean;
}
