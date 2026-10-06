import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppointmentProps } from '@types';

export interface StoreTelemedState {
  appointmentsListings: AppointmentProps[];
  // Incremented on every `${userId}:appointment_update` socket event
  appointmentUpdates: number;
}

export type ReducerFunc = (
  state: StoreTelemedState,
  payload: PayloadAction<StoreTelemedState>
) => void;

export type SetAppointmentsListingsProps = (
  state: StoreTelemedState,
  payload: PayloadAction<{ appointments: AppointmentProps[] }>
) => void;

export type AppointmentUpdatedProps = (state: StoreTelemedState) => void;
