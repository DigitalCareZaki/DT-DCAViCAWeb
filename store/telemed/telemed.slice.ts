import { createSlice } from '@reduxjs/toolkit';

import initialState from './telemed.init';
import { setAppointmentsList, appointmentUpdated } from './telemed.reducer';

const telemedSlice = createSlice({
  name: 'telemed',
  initialState,
  reducers: {
    setAppointmentsList,
    appointmentUpdated,
  },
});

export const {
  setAppointmentsList: setAppointmentsListReducer,
  appointmentUpdated: appointmentUpdatedReducer,
} = telemedSlice.actions;

export default telemedSlice.reducer;
