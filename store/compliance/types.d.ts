import type { PayloadAction } from '@reduxjs/toolkit';
import type { PatientCompliancePerPill, PatientCompliance } from '@types';

export type StoreComplianceState = {
  data: PatientCompliancePerPill;
  selected: {
    id: string;
    data: PatientCompliance;
  };
};

export type SetComplianceReducer = (
  state: StoreComplianceState,
  payload: PayloadAction<{ data: PatientCompliancePerPill }>
) => void;

export type SetSelectedComplianceMedicineReducer = (
  state: StoreComplianceState,
  payload: PayloadAction<{
    data: {
      id: string;
      data: PatientCompliance;
    };
  }>
) => void;
