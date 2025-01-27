import type { ReducerFunc, ChatReducerProps } from './types';

export const toggleCamera: ReducerFunc = (state) => {
  state.muteCamera = !state.muteCamera;
};

export const toggleMic: ReducerFunc = (state) => {
  state.muteMic = !state.muteMic;
};

export const toggleScreenSharing: ReducerFunc = (state) => {
  state.screenSharing = !state.screenSharing;
};

export const addToChats: ChatReducerProps = (state, payload) => {
  state.chats = payload.payload.chat;
};
