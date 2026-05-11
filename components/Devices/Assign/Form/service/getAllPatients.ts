'use server';

import {
  getPatientList,
  getAdminPatient,
  getOrganizationPatients,
  getUser,
} from '@service';

import type { AllPatientsRes } from '../types';
import type { SuperAdminPatientListProps } from '@types';
import type { PatientListingData } from '@types-services';
import type { PatientData } from '../types';

const patientMatchesSearch = (patient: PatientData, search?: string): boolean => {
  const value = search?.trim().toLowerCase();
  if (!value) return true;

  const fullName = [
    patient.first_name,
    patient.middle_name,
    patient.last_name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return [
    patient.first_name,
    patient.middle_name,
    patient.last_name,
    patient.email,
    fullName,
  ].some((field) => field?.toLowerCase().includes(value));
};

const filterPatients = (patients: PatientData[], search?: string): PatientData[] =>
  patients.filter((patient) => patientMatchesSearch(patient, search));

// services for each user returns a different response
// make a uniform response for all users
const getAllPatients = async (search?: string): Promise<AllPatientsRes> => {
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wrong');
  }
  const userType = user.role;

  let res: any = undefined;

  if (userType === 'SUPERADMIN') {
    res = await getOrganizationPatients(1, search ? 100 : 10, search);
  } else if (userType === 'ADMIN') {
    res = await getAdminPatient(1, search ? 100 : 10, search);
  } else if (userType === 'DOCTOR') {
    res = await getPatientList(userType.toLowerCase());
  } else if (userType === 'NURSE') {
    res = await getPatientList(userType.toLowerCase());
  }

  if (!res?.success)
    return {
      success: false,
      data: [],
    };

  if (
    userType === 'SUPERADMIN' ||
    userType === 'DOCTOR' ||
    userType === 'NURSE'
  ) {
    let patients: PatientListingData[] = [];

    if (userType === 'SUPERADMIN') {
      patients = res.data;
    } else {
      patients = res.data.data;
    }

    const mappedData = patients?.map((el) => ({
      id: el.patient.id,
      first_name: el.patient.first_name,
      middle_name: el.patient.middle_name,
      last_name: el.patient.last_name,
      email: el.patient.email,
    }));

    return {
      success: true,
      data: filterPatients(mappedData, search),
    };
  } else if (userType === 'ADMIN') {
    const patients: SuperAdminPatientListProps[] = res.data;

    return {
      success: true,
      data: filterPatients(
        patients?.map((el) => ({
          id: el.id,
          first_name: el.first_name,
          middle_name: el.middle_name,
          last_name: el.last_name,
          email: el.email,
        })),
        search
      ),
    };
  } else {
    return {
      success: false,
      data: [],
    };
  }

};

export default getAllPatients;
