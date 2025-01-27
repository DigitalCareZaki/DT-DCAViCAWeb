import { createSlice } from '@reduxjs/toolkit';

import initialState from './patient.init';
import {
  setPatientContactList,
  pushIntoPatientContactListing,
  setPatientDoctorList,
  pushIntoPatientDoctorListing,
  setPatientNurseListing,
  pushIntoPatientNurseListing,
  setPatientMeasurementListing,
  pushIntoPatientMeasurementListing,
  setPatientMedicationListing,
  pushIntoPatientMedicationListing,
} from './patient.reducer';

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatientContactList,
    pushIntoPatientContactListing,
    setPatientDoctorList,
    pushIntoPatientDoctorListing,
    setPatientNurseListing,
    pushIntoPatientNurseListing,
    setPatientMeasurementListing,
    pushIntoPatientMeasurementListing,
    setPatientMedicationListing,
    pushIntoPatientMedicationListing,
  },
});

export const {
  setPatientContactList: setPatientContactListReducer,
  pushIntoPatientContactListing: pushIntoPatientContactListingReducer,
  setPatientDoctorList: setPatientDoctorListReducer,
  pushIntoPatientDoctorListing: pushIntoPatientDoctorListingReducer,
  setPatientNurseListing: setPatientNurseListingReducer,
  pushIntoPatientNurseListing: pushIntoPatientNurseListingReducer,
  setPatientMeasurementListing: setPatientMeasurementListingReducer,
  pushIntoPatientMeasurementListing: pushIntoPatientMeasurementListingReducer,
  setPatientMedicationListing: setPatientMedicationListingReduer,
  pushIntoPatientMedicationListing: pushIntoPatientMedicationListingReducer,
} = patientSlice.actions;

export default patientSlice.reducer;
