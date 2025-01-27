import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppointmentChatProps } from '@types';

export type StoreMeetingState = {
  muteCamera: boolean;
  muteMic: boolean;
  chats: AppointmentChatProps[];
  screenSharing: boolean;
};

export type ReducerFunc = (state: StoreMeetingState) => void;

export type ChatReducerProps = (
  state: StoreMeetingState,
  payload: PayloadAction<{ chat: AppointmentChatProps[] }>
) => void;
