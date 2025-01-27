import type { HandleEventProps, AddToParticipantsProps } from './types';

export const handleEvent: HandleEventProps = (state, payload) => {
  state.emit = { ...payload?.payload };
};

export const addToParticipants: AddToParticipantsProps = (state, payload) => {
  state.participants = payload.payload.data;
};
