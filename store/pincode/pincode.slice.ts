import { createSlice } from '@reduxjs/toolkit';

import initialState from './pincode.init';
import { setPincodeRecords } from './pincode.reducer';

const pincodeSlice = createSlice({
  name: 'pincodes',
  initialState,
  reducers: {
    setPincodeRecords,
  },
});

export const { setPincodeRecords: setPincodeRecordsSlice } = pincodeSlice.actions;

export default pincodeSlice.reducer;
