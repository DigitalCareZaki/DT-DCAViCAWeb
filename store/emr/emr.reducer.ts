import type { SetEMRRecords } from './types';

export const setEmrRecords: any = (state: any, payload: any) => {
  state.appointments = [...payload.payload.appointments];
};
