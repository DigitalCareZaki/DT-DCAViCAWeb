import type { PinCodeRecord } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreChangePincodeState = {
  pincodes: PinCodeRecord[];
};

export type SetChangePincodeRecords = (
  state: StoreChangePincodeState,
  action: PayloadAction<{ pincodes: PinCodeRecord[] }>
) => void;
