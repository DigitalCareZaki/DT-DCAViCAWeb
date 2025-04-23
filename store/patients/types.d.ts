import { PayloadAction } from '@reduxjs/toolkit';
import type {
  PatientContactsProps,
  PatientDoctorsProps,
  PatientMeasurementProps,
  PatientNursesProps,
  PatientMedicationProps,
} from '@types';

export interface StorePatientState {
  patientsContactsListings: PatientContactsProps[];
  patientsDoctosListings: PatientDoctorsProps[];
  patientNurseListing: PatientNursesProps[];
  patientMeasurementListing: any;
  patientAppointmentListing: any;
  patientMedicationListing: PatientMedicationProps[];
  pagination: any;
}

export type ReducerFunc = (
  state: StorePatientState,
  payload: PayloadAction<StorePatientState>
) => void;

export type SetPatientContactListing = (
  state: StorePatientState,
  payload: PayloadAction<{ contacts: PatientContactsProps[] }>
) => void;

export type SetPatientDoctorListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ doctors: PatientDoctorsProps[] }>
) => void;

export type PushIntoPatientContactListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ contact: PatientContactsProps }>
) => void;

export type PushIntoPatientDoctorListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ doctors: PatientDoctorsProps }>
) => void;

export type SetPatientNurseListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ nurses: PatientNursesProps[] }>
) => void;

export type PushIntoPatientNurseListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ nurse: PatientNursesProps }>
) => void;

export type SetPatientMeasurementListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ measurements: any }>,
) => void;

export type PushIntoPatientMeasurementListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ measurement: PatientMeasurementProps }>
) => void;

export type SetPatientMedicationListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ medications: PatientMedicationProps[] }>
) => void;

export type PushIntoPatientMedicationListingProps = (
  state: StorePatientState,
  payload: PayloadAction<{ medication: PatientMedicationProps }>
) => void;
