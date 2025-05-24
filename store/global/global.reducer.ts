import {
  ReducerFunc,
  ReducerFuncSecondary,
  ShowModalFunc,
  SelectMessageFunc,
  UpdateMessageFunc,
  ComposeEmailFunc,
  SetInboxFunc, // ADDED
} from './types';

export const setGlobalState: ReducerFunc = (state, payload) => { };

export const toggleDoctorContactForm: ReducerFuncSecondary = (state) => {
  state.modals.doctorContactForm = !state.modals.doctorContactForm;
};

export const toggleDoctorMedicationForm: ReducerFuncSecondary = (state) => {
  state.modals.doctorMedicationForm = !state.modals.doctorMedicationForm;
};

export const toggleDoctorPatientDoctorForm: ReducerFuncSecondary = (state) => {
  state.modals.doctorPatientDoctorForm = !state.modals.doctorPatientDoctorForm;
};

export const toggleDoctorPatientNurseForm: ReducerFuncSecondary = (state) => {
  state.modals.doctorPatientNurseForm = !state.modals.doctorPatientNurseForm;
};

export const toggleDoctorEducationForm: ReducerFuncSecondary = (state) => {
  state.modals.doctorEducationForm = !state.modals.doctorEducationForm;
};

export const toggleDoctorPatientAlertForm: ReducerFuncSecondary = (state) => {
  state.modals.doctorPatientAlertForm = !state.modals.doctorPatientAlertForm;
};

export const toggleDoctorAppointmentCall: ReducerFuncSecondary = (state) => {
  state.modals.doctorAppointmentCall = !state.modals.doctorAppointmentCall;
};

export const toggleDoctorAppointmentPatientVitals: ReducerFuncSecondary = (
  state
) => {
  state.modals.doctorAppointmentPatientVitals =
    !state.modals.doctorAppointmentPatientVitals;
};

export const toggleComposeMessage: ReducerFuncSecondary = (state) => {
  state.modals.composeMessage = !state.modals.composeMessage;
};

export const composeEmail: ComposeEmailFunc = (state, payload) => {
  state.composeMessage = {
    to: payload.payload?.to ?? '',
    subject: payload.payload?.subject ?? '',
    content: payload.payload?.content ?? '',
    attachments: payload.payload?.attachments ?? [],
    parent_id: payload.payload?.parent_id ?? '',
  };
};

export const showModal: ShowModalFunc = (state, payload) => {
  state.bottomModal = {
    ...payload.payload,
  };
};

export const selectMessage: SelectMessageFunc = (state, payload) => {
  state.message = {
    show: true,
    data: payload.payload,
  };
};

export const updateMessage: UpdateMessageFunc = (state, payload) => {
  state.message.data = payload.payload;
};

export const toggleAddMeasurementForm: ReducerFuncSecondary = (state) => {
  state.modals.addMeasurementForm = !state.modals.addMeasurementForm;
};

export const setInbox: SetInboxFunc = (state, payload) => {
  state.inbox = payload.payload;
};
