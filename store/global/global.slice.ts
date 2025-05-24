import { createSlice } from '@reduxjs/toolkit';

import initialState from './global.init';
import {
  setGlobalState,
  toggleDoctorContactForm,
  toggleDoctorMedicationForm,
  toggleDoctorPatientDoctorForm,
  toggleDoctorPatientNurseForm,
  toggleDoctorEducationForm,
  toggleDoctorPatientAlertForm,
  toggleDoctorAppointmentCall,
  toggleDoctorAppointmentPatientVitals,
  showModal,
  toggleComposeMessage,
  selectMessage,
  updateMessage,
  composeEmail,
  toggleAddMeasurementForm,
  setInbox,
} from './global.reducer';

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalState,
    toggleDoctorContactForm,
    toggleDoctorMedicationForm,
    toggleDoctorPatientDoctorForm,
    toggleDoctorPatientNurseForm,
    toggleDoctorEducationForm,
    toggleDoctorPatientAlertForm,
    toggleDoctorAppointmentCall,
    toggleDoctorAppointmentPatientVitals,
    showModal,
    toggleComposeMessage,
    selectMessage,
    updateMessage,
    composeEmail,
    toggleAddMeasurementForm,
    setInbox,
  },
});

export const {
  setGlobalState: setGlobalReducer,
  toggleDoctorContactForm: toggleDoctorContactReducer,
  toggleDoctorMedicationForm: toggleDoctorMedicationReducer,
  toggleDoctorPatientDoctorForm: toggleDoctorPatientDoctorReducer,
  toggleDoctorPatientNurseForm: toggleDoctorPatientNurseReducer,
  toggleDoctorEducationForm: toggleDoctorEducationReducer,
  toggleDoctorPatientAlertForm: toggleDoctorPatientAlertReducer,
  toggleDoctorAppointmentCall: toggleDoctorAppointmentReducer,
  toggleDoctorAppointmentPatientVitals:
  toggleDoctorAppointmentPatientVitalsReducer,
  showModal: showModalReducer,
  toggleComposeMessage: toggleComposeMessageReducer,
  selectMessage: selectMessageReducer,
  updateMessage: updateMessageReducer,
  composeEmail: composeEmailReducer,
  toggleAddMeasurementForm: toggleAddMeasurementFormReducer,
  setInbox: setInboxReducer,
} = globalSlice.actions;

export default globalSlice.reducer;
