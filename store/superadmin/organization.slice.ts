import { createSlice } from '@reduxjs/toolkit';

import initialState from './organization.init';
import {
  setCurrentOrganization,
  setOrganizationUsers,
  setBranches,
} from './organizaton.reducer';

const superadminSlice = createSlice({
  name: 'superadmin',
  initialState,
  reducers: {
    setCurrentOrganization,
    setOrganizationUsers,
    setBranches,
  },
});

export const {
  setCurrentOrganization: setCurrentOrganizationReducer,
  setOrganizationUsers: setOrganizationUsersReducer,
  setBranches: setBranchesReducer,
} = superadminSlice.actions;

export default superadminSlice.reducer;
