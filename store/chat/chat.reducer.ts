import type {
  SetRoomsReducer,
  SelectRoomReducer,
  SetFetchingRoomsReducer,
  PushToRoomChats,
  SetToRoomChats,
} from './types';

export const setRooms: SetRoomsReducer = (state, payload) => {
  state.rooms = payload.payload.rooms;
};

export const setSelectedRoom: SelectRoomReducer = (state, payload) => {
  state.selectedRooms = payload.payload.room;
  state.rooms = state.rooms.map((room) =>
    room.id === payload.payload.room.id ? { ...room, hasNewMessage: false } : room
  );
};

export const setFetchingRooms: SetFetchingRoomsReducer = (state, payload) => {
  state.fetchingRooms = payload.payload.value;
};

export const pushToSelectedRoom: SelectRoomReducer = (state, payload) => {
  const room = state.rooms.find(
    (el) => el.users[0].id === payload.payload.room.users[0].id
  );

  if (!room?.id) {
    state.rooms = state.rooms.map((r) => {
      if (r.users[0].id === payload.payload.room.users[0].id) {
        return {
          id: payload.payload.room.id,
          users: payload.payload.room.users,
        };
      }

      return r;
    });
  }
};

export const pushToRoomChats: PushToRoomChats = (state, payload) => {
  const chats = state.chats[payload.payload.key];
  state.chats[payload.payload.key] = [...chats, payload.payload.data];
  state.rooms = state.rooms.map((room) =>
    room.id === payload.payload.key ? { ...room, hasNewMessage: true } : room
  );
};

export const setToRoomChats: SetToRoomChats = (state, payload) => {
  state.chats[payload.payload.key] = payload.payload.data;
};
