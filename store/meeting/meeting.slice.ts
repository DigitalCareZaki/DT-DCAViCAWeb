import { createSlice } from '@reduxjs/toolkit';

import initialState from './meeting.init';
import { toggleCamera, toggleMic, addToChats, toggleScreenSharing } from './meeting.reducer';

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    toggleCamera,
    toggleMic,
    addToChats,
    toggleScreenSharing,
  },
});

export const {
  toggleCamera: toggleCameraReducer,
  toggleMic: toggleMicReducer,
  addToChats: addToChatsReducer,
  toggleScreenSharing: toggleScreenSharingReducer,
} = meetingSlice.actions;

export default meetingSlice.reducer;
