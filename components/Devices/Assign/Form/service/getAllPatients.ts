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
    res = await getOrganizationPatients();
  } else if (userType === 'ADMIN') {
    res = await getAdminPatient(1, 10, search);
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
    const patients: PatientListingData[] = res.data.data; // yaha doctor sa assign karty waqt backend sa payload change howa han 

    return {
      success: true,
      data: patients?.map((el) => ({
        id: el.patient.id,
        first_name: el.patient.first_name,
        middle_name: el.patient.middle_name,
        last_name: el.patient.last_name,
        email: el.patient.email,
      })),
    };
  } else if (userType === 'ADMIN') {
    const patients: SuperAdminPatientListProps[] = res.data;

    return {
      success: true,
      data: patients?.map((el) => ({
        id: el.id,
        first_name: el.first_name,
        middle_name: el.middle_name,
        last_name: el.last_name,
        email: el.email,
      })),
    };
  } else {
    return {
      success: false,
      data: [],
    };
  }
};

export default getAllPatients;
