import { createSlice } from '@reduxjs/toolkit';

import initialState from './compliance.init';
import {
  setCompilanceData,
  setComplianceSelectedMedicineData,
} from './compliance.reducer';

const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    setCompilanceData,
    setComplianceSelectedMedicineData,
  },
});

export const {
  setCompilanceData: SetComplianceReducer,
  setComplianceSelectedMedicineData: SetSelectedComplianceMedicineReducer,
} = complianceSlice.actions;

export default complianceSlice.reducer;
