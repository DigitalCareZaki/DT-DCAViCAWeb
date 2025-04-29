import type { SetChangePasswordRecords } from './types';

export const changePasswordRecords: SetChangePasswordRecords = (state, action) => {
  state.changePasswords = [...action.payload.passwords];
};