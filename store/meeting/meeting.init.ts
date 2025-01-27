import type { StoreMeetingState } from './types';

const initialState: StoreMeetingState = {
  muteCamera: false,
  muteMic: false,
  screenSharing: false,
  chats: [],
};

export default initialState;
