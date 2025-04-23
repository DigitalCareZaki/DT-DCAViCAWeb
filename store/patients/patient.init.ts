import type { StorePatientState } from './types';

const initialState: any = {
  patientsContactsListings: [],
  patientsDoctosListings: [],
  patientNurseListing: [],
  patientMeasurementListing: [],
  patientMedicationListing: [],
  patientAppointmentListing: [],
  pagination: {}, // Add this line to store pagination data
};

export default initialState;
