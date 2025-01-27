import { createSlice } from '@reduxjs/toolkit';

import initialState from './user.init';
import { setUser } from './user.reducers';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser,
  },
});

export const { setUser: setUserReducer } = userSlice.actions;
export default userSlice.reducer;
