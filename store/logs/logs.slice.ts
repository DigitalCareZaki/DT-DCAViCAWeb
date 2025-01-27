import { createSlice } from '@reduxjs/toolkit';

import initialState from './logs.init';
import { setLogs } from './logs.reducer';

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs,
  },
});

export const { setLogs: setLogsReducer } = logsSlice.actions;

export default logsSlice.reducer;
