import type { InboxDataProps } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreGlobalState = {
  modals: {
    doctorContactForm: boolean;
    doctorMedicationForm: boolean;
    doctorPatientDoctorForm: boolean;
    doctorPatientNurseForm: boolean;
    doctorEducationForm: boolean;
    doctorPatientAlertForm: boolean;
    doctorAppointmentCall: boolean;
    doctorAppointmentPatientVitals: boolean;
    composeMessage: boolean;
    addMeasurementForm: boolean;
  };
  bottomModal: {
    message: string | undefined;
    show: boolean;
    type: 'ERROR' | 'SUCCESS' | 'WARNING' | undefined;
  };
  message: {
    show: boolean;
    data: InboxDataProps | undefined;
  };
  composeMessage: {
    to: string;
    subject: string;
    content: string;
    attachments: any[];
    parent_id: string;
  };
};

export type ModalState = {
  message: string | undefined;
  type: 'ERROR' | 'SUCCESS' | 'WARNING' | undefined;
  show: boolean;
};

export type ReducerFunc = (
  state: StoreGlobalState,
  payload: PayloadAction<StoreGlobalState>
) => void;

export type ReducerFuncSecondary = (state: StoreGlobalState) => void;

export type ShowModalFunc = (
  state: StoreGlobalState,
  payload: PayloadAction<ModalState>
) => void;

export type ComposeEmailFunc = (
  state: StoreGlobalState,
  payload: PayloadAction<{ to?: string; subject?: string; content?: string, attachments?: string[], parent_id?: string }>
) => void;

export type SelectMessageFunc = (
  state: StoreGlobalState,
  payload: PayloadAction<InboxDataProps>
) => void;

export type UpdateMessageFunc = (
  state: StoreGlobalState,
  payload: PayloadAction<InboxDataProps>
) => void;
