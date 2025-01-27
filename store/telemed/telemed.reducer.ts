import type { SetAppointmentsListingsProps } from './types';

export const setAppointmentsList: SetAppointmentsListingsProps = (
  state,
  payload
) => {
  state.appointmentsListings = [...payload.payload.appointments];
};
