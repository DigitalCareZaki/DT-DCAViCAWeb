import type { StoreContactState } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const setContacts = (
  state: StoreContactState,
  action: PayloadAction<{ contacts: StoreContactState['contacts'] }>
) => {
  state.contacts = action.payload.contacts;
};