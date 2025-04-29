import type { ChangePasswordRecord } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreChangePasswordState = {
  changePasswords: ChangePasswordRecord[];
};

export type SetChangePasswordRecords = (
  state: StoreChangePasswordState,
  action: PayloadAction<{ passwords: ChangePasswordRecord[] }>
) => void;
