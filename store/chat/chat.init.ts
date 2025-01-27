import type { StoreChatState } from './types';

const inititalState: StoreChatState = {
  rooms: [],
  selectedRooms: null,
  fetchingRooms: false,
  chats: {
    mock: [],
  },
};

export default inititalState;
