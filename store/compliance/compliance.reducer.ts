import type {
  SetComplianceReducer,
  SetSelectedComplianceMedicineReducer,
} from './types';

export const setCompilanceData: SetComplianceReducer = (state, payload) => {
  const data = payload.payload.data;
  state.data = data;

  // Reset the selected medication so the chart doesn't keep showing the previous patient's compliance
  const firstMedication = data.medications?.[0];
  state.selected = firstMedication
    ? { id: firstMedication.id, data: firstMedication.compliance }
    : { id: '', data: {} };
};

export const setComplianceSelectedMedicineData: SetSelectedComplianceMedicineReducer =
  (state, payload) => {
    state.selected = payload.payload.data;
  };
