import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatRoomProps, ChatRoomChatProps } from '@types';

export interface StoreChatState {
  rooms: ChatRoomProps[];
  selectedRooms: ChatRoomProps | null;
  fetchingRooms: boolean;
  chats: {
    [key: string]: Array<ChatRoomChatProps>;
  };
}

export type SetRoomsReducer = (
  state: StoreChatState,
  payload: PayloadAction<{ rooms: ChatRoomProps[] }>
) => void;

export type SelectRoomReducer = (
  state: StoreChatState,
  payload: PayloadAction<{ room: ChatRoomProps }>
) => void;

export type SetFetchingRoomsReducer = (
  state: StoreChatState,
  payload: PayloadAction<{ value: boolean }>
) => void;

export type PushToRoomChats = (
  state: StoreChatState,
  payload: PayloadAction<{ data: ChatRoomChatProps; key: string }>
) => void;

export type SetToRoomChats = (
  state: StoreChatState,
  payload: PayloadAction<{ data: ChatRoomChatProps[]; key: string }>
) => void;
