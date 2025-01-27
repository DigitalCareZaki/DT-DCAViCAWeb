import { createSlice } from '@reduxjs/toolkit';

import initialState from './chat.init';
import {
  setRooms,
  setSelectedRoom,
  setFetchingRooms,
  pushToSelectedRoom,
  pushToRoomChats,
  setToRoomChats,
} from './chat.reducer';

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setRooms,
    setSelectedRoom,
    setFetchingRooms,
    pushToSelectedRoom,
    pushToRoomChats,
    setToRoomChats,
  },
});

export const {
  setRooms: setRoomsReducer,
  setSelectedRoom: setSelectedRoomReducer,
  setFetchingRooms: setFetchingRoomsReducer,
  pushToSelectedRoom: pushToSelectedRoomReducer,
  pushToRoomChats: pushToRoomChatsReducer,
  setToRoomChats: setToRoomChatsReducer,
} = chatSlice.actions;

export default chatSlice.reducer;
