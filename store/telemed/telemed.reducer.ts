import type {
  SetAppointmentsListingsProps,
  AppointmentUpdatedProps,
} from './types';

export const setAppointmentsList: SetAppointmentsListingsProps = (
  state,
  payload
) => {
  state.appointmentsListings = [...payload.payload.appointments];
};

export const appointmentUpdated: AppointmentUpdatedProps = (state) => {
  state.appointmentUpdates += 1;
};
