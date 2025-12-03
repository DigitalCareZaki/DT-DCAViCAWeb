import { createSlice } from '@reduxjs/toolkit';

import initialState from './emr.init';
import { setEmrRecords, deleteEmrRecord } from './emr.reducer';

const emrSlice = createSlice({
  name: 'emr',
  initialState,
  reducers: {
    setEmrRecords,
    deleteEmrRecord,
  },
});

export const {
  setEmrRecords: setEmrRecordsSlice,
  deleteEmrRecord: deleteEmrRecordSlice,
} = emrSlice.actions;

export default emrSlice.reducer;
