import type { SetChangePincodeRecords } from './types';

export const setPincodeRecords: SetChangePincodeRecords = (state, action) => {
  state.pincodes = [...action.payload.pincodes];
};