import type { StoreGlobalState } from './types';

const initialState: StoreGlobalState = {
  modals: {
    doctorContactForm: false,
    doctorMedicationForm: false,
    doctorPatientDoctorForm: false,
    doctorPatientNurseForm: false,
    doctorEducationForm: false,
    doctorPatientAlertForm: false,
    doctorAppointmentCall: false,
    doctorAppointmentPatientVitals: false,
    composeMessage: false,
    addMeasurementForm: false,
  },
  bottomModal: {
    type: undefined,
    message: undefined,
    show: false,
  },
  message: {
    show: false,
    data: undefined,
  },
  composeMessage: {
    to: '',
    subject: '',
    content: '',
    attachments: [],
    parent_id: '',
  },
};

export default initialState;
