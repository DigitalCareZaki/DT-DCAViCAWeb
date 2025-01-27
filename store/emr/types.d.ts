import type { EMRRecordsProps } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreEMRState = {
  records: EMRRecordsProps[];
};

export type SetEMRRecords = (
  state: StoreEMRState,
  payload: PayloadAction<{ records: EMRRecordsProps[] }>
) => void;
