import type { StoreEMRState } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const setEmrRecords = (
  state: StoreEMRState,
  action: PayloadAction<{ records: StoreEMRState['records'] }>
) => {
  state.records = action.payload.records;
};

export const deleteEmrRecord = (
  state: StoreEMRState,
  action: PayloadAction<{ id: string }>
) => {
  state.records = state.records.filter(
    (record: any) => record._id !== action.payload.id && record.id !== action.payload.id
  );
};