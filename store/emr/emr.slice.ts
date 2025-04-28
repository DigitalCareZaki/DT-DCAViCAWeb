import { createSlice } from '@reduxjs/toolkit';

import initialState from './emr.init';
import { setEmrRecords } from './emr.reducer';

const emrSlice: any = createSlice({
  name: 'emr',
  initialState,
  reducers: {
    setEmrRecords,
  },
});

export const { setEmrRecords: setEmrRecordsSlice } = emrSlice.actions;

export default emrSlice.reducer;
