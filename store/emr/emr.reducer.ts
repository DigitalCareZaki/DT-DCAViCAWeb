import type { SetEMRRecords } from './types';

export const setEmrRecords: SetEMRRecords = (state, payload) => {
  state.records = [...payload.payload.records];
};
