import { ReducerFunc } from './types';

export const setUser: ReducerFunc = (state, payload) => {
  state.user = payload.payload.user;
};
