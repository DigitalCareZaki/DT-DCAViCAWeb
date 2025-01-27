import { createSlice } from '@reduxjs/toolkit';

import initialState from './telemed.init';
import { setAppointmentsList } from './telemed.reducer';

const telemedSlice = createSlice({
  name: 'telemed',
  initialState,
  reducers: {
    setAppointmentsList,
  },
});

export const { setAppointmentsList: setAppointmentsListReducer } =
  telemedSlice.actions;

export default telemedSlice.reducer;
