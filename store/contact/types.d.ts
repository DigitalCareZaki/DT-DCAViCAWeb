import type { ContactsProps } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreContactState = {
  contacts: ContactsProps[];
};

export type SetEMRRecords = (
  state: StoreContactState,
  payload: PayloadAction<{ contacts: ContactsProps[] }>
) => void;
