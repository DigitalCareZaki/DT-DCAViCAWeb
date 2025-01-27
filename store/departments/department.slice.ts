import { createSlice } from '@reduxjs/toolkit';

import initialState from './department.init';
import { setDepartments } from './department.reducer';

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartments,
  },
});

export const { setDepartments: setDepartmentsReducer } =
  departmentSlice.actions;

export default departmentSlice.reducer;
