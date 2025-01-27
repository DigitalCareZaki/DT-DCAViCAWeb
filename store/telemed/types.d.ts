import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppointmentProps } from '@types';

export interface StoreTelemedState {
  appointmentsListings: AppointmentProps[];
}

export type ReducerFunc = (
  state: StoreTelemedState,
  payload: PayloadAction<StoreTelemedState>
) => void;

export type SetAppointmentsListingsProps = (
  state: StoreTelemedState,
  payload: PayloadAction<{ appointments: AppointmentProps[] }>
) => void;
