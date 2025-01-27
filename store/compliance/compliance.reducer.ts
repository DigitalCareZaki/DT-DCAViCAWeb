import type {
  SetComplianceReducer,
  SetSelectedComplianceMedicineReducer,
} from './types';

export const setCompilanceData: SetComplianceReducer = (state, payload) => {
  if (payload.payload.data.user.id !== state.data.user.id) {
    state.data = payload.payload.data;
  }
};

export const setComplianceSelectedMedicineData: SetSelectedComplianceMedicineReducer =
  (state, payload) => {
    state.selected = payload.payload.data;
  };
