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
    room.id === payload.payload.room.id
      ? { ...room, hasNewMessage: false, unread_count: 0 }
      : room
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
    room.id === payload.payload.key
      ? {
        ...room,
        hasNewMessage: true,
        unread_count: (room.unread_count ?? 0) + 1,
        last_message_at: payload.payload.data.created_at,
      }
      : room
  );
};

// Apply incremental room updates coming from socket events
export const applyRoomUpdate = (
  state: any,
  payload: { payload: { room_id: string; unread_increment?: number; last_message_at?: number } }
) => {
  const { room_id, unread_increment = 0, last_message_at } = payload.payload;

  state.rooms = state.rooms
    .map((r) =>
      r.id === room_id
        ? {
          ...r,
          unread_count: (r.unread_count ?? 0) + unread_increment,
          last_message_at: last_message_at ?? r.last_message_at ?? 0,
        }
        : r
    )
    .sort((a, b) => {
      const ud = (b.unread_count ?? 0) - (a.unread_count ?? 0);
      if (ud) return ud;
      return (b.last_message_at ?? 0) - (a.last_message_at ?? 0);
    });
};

export const setToRoomChats: SetToRoomChats = (state, payload) => {
  state.chats[payload.payload.key] = payload.payload.data;
};
