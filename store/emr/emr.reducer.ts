import type { StoreEMRState } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const setEmrRecords = (
  state: StoreEMRState,
  action: PayloadAction<{ records: StoreEMRState['records'] }>
) => {
  state.records = action.payload.records;
};