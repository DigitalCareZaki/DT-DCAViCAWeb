import type { SetLogs } from './types';

export const setLogs: SetLogs = (state, payload) => {
  state.logs = [...payload.payload.data];
};
