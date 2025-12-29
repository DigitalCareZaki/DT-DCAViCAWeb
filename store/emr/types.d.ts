import type { EMRRecordsProps } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreEMRState = {
  records: EMRRecordsProps[];
  searchTerm: string;
};

export type SetEMRRecords = (
  state: StoreEMRState,
  payload: PayloadAction<{ records: EMRRecordsProps[] }>
) => void;

export type SetSearchTerm = (
  state: StoreEMRState,
  payload: PayloadAction<{ searchTerm: string }>
) => void;
