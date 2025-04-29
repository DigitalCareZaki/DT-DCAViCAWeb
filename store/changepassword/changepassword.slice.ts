import { createSlice } from '@reduxjs/toolkit';

import initialState from './changepassword.init';
import { changePasswordRecords } from './changepassword.reducer';

const changepasswordSlice = createSlice({
  name: 'changePasswords',
  initialState,
  reducers: {
    changePasswordRecords,
  },
});

export const { changePasswordRecords: changePasswordRecordsSlice } = changepasswordSlice.actions;

export default changepasswordSlice.reducer;
