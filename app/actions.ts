'use server';

import { headers } from 'next/headers';
import {
  getPatientList as getPatientListService,
  getPatientProfile as getPatientProfileService,
  getPatientContacts as getPatientContactsService,
  searchDoctor as searchDoctorService,
  getPatientDoctors as getPatientDoctorsService,
  getPatientNurses as getPatientNursesService,
  searchNurse as searchNurseService,
  getPatientMeasurements as getPatientMeasurementsService,
  getPatientMedications as getPatientMedicationsService,
  getUser as getUserService,
  getCompliancePerPill as getCompliancePerPillService,
} from '@service';

import '@init-globals';

export const getUser = async () => getUserService();

export async function getUserTypeHeaders(): Promise<string | null> {
  return headers().get('user-type');
}

export const getPatientList = async (userType: string = 'doctor') =>
  getPatientListService(userType);

export const getPatientProfile = async (
  id: string,
  userType: string = 'doctor'
) => getPatientProfileService(id, userType);

export const getPatientContacts = async (
  id: string,
  search?: string,
  type: string = 'doctor'
) => getPatientContactsService(id, search, type);

export const searchDoctor = async (search: string) =>
  searchDoctorService(search);

export const getPatientDoctors = async (
  id: string,
  search?: string,
  type: string = 'doctor'
) => getPatientDoctorsService(id, search, type);

export const getPatientNurses = async (
  id: string,
  search?: string,
  type: string = 'doctor'
) => getPatientNursesService(id, search, type);

export const searchNurse = async (search: string) => searchNurseService(search);

export const getPatientMeasurements = async (
  id: string,
  type: string,
  page: number,
  pageSize: number
) => getPatientMeasurementsService(id, type, page, pageSize);

export const getPatientMedications = async (id: string, search?: string) =>
  getPatientMedicationsService(id, search);

export const getPatientCompilancePerPill = async (patientId: string) =>
  getCompliancePerPillService(patientId);
