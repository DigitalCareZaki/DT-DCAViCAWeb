import type {
  PushIntoPatientContactListingProps,
  PushIntoPatientDoctorListingProps,
  SetPatientDoctorListingProps,
  SetPatientContactListing,
  SetPatientNurseListingProps,
  PushIntoPatientNurseListingProps,
  SetPatientMeasurementListingProps,
  PushIntoPatientMeasurementListingProps,
  SetPatientMedicationListingProps,
  PushIntoPatientMedicationListingProps,
} from './types';

export const setPatientContactList: SetPatientContactListing = (
  state,
  payload
) => {
  if (!payload.payload?.contacts?.length) return;
  state.patientsContactsListings = [...payload.payload.contacts];
};

export const pushIntoPatientContactListing: PushIntoPatientContactListingProps =
  (state, payload) => {
    const contacts = state.patientsContactsListings;

    contacts.push(payload.payload.contact);
  };

export const setPatientDoctorList: SetPatientDoctorListingProps = (
  state,
  payload
) => {
  state.patientsDoctosListings = [...payload.payload.doctors];
};

export const pushIntoPatientDoctorListing: PushIntoPatientDoctorListingProps = (
  state,
  payload
) => {
  const doctors = state.patientsDoctosListings;
  doctors.push(payload.payload.doctors);
};

export const setPatientNurseListing: SetPatientNurseListingProps = (
  state,
  payload
) => {
  state.patientNurseListing = [...payload.payload.nurses];
};

export const pushIntoPatientNurseListing: PushIntoPatientNurseListingProps = (
  state,
  payload
) => {
  const nurse = state.patientNurseListing;
  nurse.push(payload.payload.nurse);
};

export const setPatientMeasurementListing: SetPatientMeasurementListingProps = (
  state,
  payload
) => {
  state.patientMeasurementListing = [...payload.payload.measurements];
};

export const pushIntoPatientMeasurementListing: PushIntoPatientMeasurementListingProps =
  (state, payload) => {
    const measurements = state.patientMeasurementListing;
    measurements.push(payload.payload.measurement);
  };

export const setPatientMedicationListing: SetPatientMedicationListingProps = (
  state,
  payload
) => {
  state.patientMedicationListing = [...payload.payload.medications];
};

export const pushIntoPatientMedicationListing: PushIntoPatientMedicationListingProps =
  (state, payload) => {
    const medications = state.patientMedicationListing;
    medications.push(payload.payload.medication);
  };
