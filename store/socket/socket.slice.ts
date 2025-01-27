import { createSlice } from '@reduxjs/toolkit';

import initialState from './socket.init';
import { handleEvent, addToParticipants } from './socket.reducer';

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    handleEvent,
    addToParticipants,
  },
});

export const {
  handleEvent: handleEventReducer,
  addToParticipants: addToParticipantsReducer,
} = socketSlice.actions;

export default socketSlice.reducer;
