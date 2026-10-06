import { createSlice } from '@reduxjs/toolkit';

import initialState from './meeting.init';
import {
  toggleCamera,
  toggleMic,
  addToChats,
  toggleScreenSharing,
  setScreenSharing,
} from './meeting.reducer';

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    toggleCamera,
    toggleMic,
    addToChats,
    toggleScreenSharing,
    setScreenSharing,
  },
});

export const {
  toggleCamera: toggleCameraReducer,
  toggleMic: toggleMicReducer,
  addToChats: addToChatsReducer,
  toggleScreenSharing: toggleScreenSharingReducer,
  setScreenSharing: setScreenSharingReducer,
} = meetingSlice.actions;

export default meetingSlice.reducer;
