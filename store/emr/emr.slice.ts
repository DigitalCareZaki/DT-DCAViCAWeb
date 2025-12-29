import { createSlice } from '@reduxjs/toolkit';

import initialState from './emr.init';
import { setEmrRecords, deleteEmrRecord, setSearchTerm } from './emr.reducer';

const emrSlice = createSlice({
  name: 'emr',
  initialState,
  reducers: {
    setEmrRecords,
    deleteEmrRecord,
    setSearchTerm,
  },
});

export const {
  setEmrRecords: setEmrRecordsSlice,
  deleteEmrRecord: deleteEmrRecordSlice,
  setSearchTerm: setSearchTermSlice,
} = emrSlice.actions;

export default emrSlice.reducer;
