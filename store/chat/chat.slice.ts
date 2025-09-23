import { createSlice } from '@reduxjs/toolkit';

import initialState from './chat.init';
import {
  setRooms,
  setSelectedRoom,
  setFetchingRooms,
  pushToSelectedRoom,
  pushToRoomChats,
  setToRoomChats,
  // @ts-ignore custom reducer (not typed in types.d.ts)
  applyRoomUpdate,
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
    // socket-driven room updates
    applyRoomUpdate,
  },
});

export const {
  setRooms: setRoomsReducer,
  setSelectedRoom: setSelectedRoomReducer,
  setFetchingRooms: setFetchingRoomsReducer,
  pushToSelectedRoom: pushToSelectedRoomReducer,
  pushToRoomChats: pushToRoomChatsReducer,
  setToRoomChats: setToRoomChatsReducer,
  applyRoomUpdate: applyRoomUpdateReducer,
} = chatSlice.actions;

export default chatSlice.reducer;
