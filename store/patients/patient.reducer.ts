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
import { PayloadAction } from '@reduxjs/toolkit';

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

export const setPatientMeasurementListing = (
  state: any,
  payload: PayloadAction<{ measurements: any; pagination: any }>
) => {
  state.patientMeasurementListing = payload.payload.measurements;
  state.pagination = payload.payload.pagination; // This will now work
};

export const setPatientAppointmentsListing = (
  state: any,
  payload: PayloadAction<{ appointments: any; pagination: any }>
) => {

  state.setPatientAppointmentsListing = payload.payload.appointments;
  state.pagination = payload.payload.pagination;
};

export const pushIntoPatientMeasurementListing: PushIntoPatientMeasurementListingProps =
  (state, payload) => {
    // Ensure we push into the correct array for table updates
    if (state.patientMeasurementListing && Array.isArray(state.patientMeasurementListing.data)) {
      state.patientMeasurementListing.data.unshift(payload.payload.measurement);
    } else if (Array.isArray(state.patientMeasurementListing)) {
      state.patientMeasurementListing.unshift(payload.payload.measurement);
    }
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
    medications.unshift(payload.payload.medication);
  };
