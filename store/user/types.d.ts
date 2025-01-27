import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProps } from '@types';

export interface StoreUserState {
  user: UserProps;
}

export type ReducerFunc = (
  state: StoreUserState,
  payload: PayloadAction<StoreUserState>
) => void;
