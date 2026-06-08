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
    res = await getOrganizationPatients(1, 100, search);
  } else if (userType === 'ADMIN') {
    res = await getAdminPatient(1, 100, search);
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

  const normalize = (value?: string | null) =>
    value?.toLowerCase().trim().replace(/\s+/g, ' ') ?? '';
  const searchTerm = normalize(search);
  const searchTokens = searchTerm.split(' ').filter(Boolean);
  const filterPatients = (patients: AllPatientsRes['data']) => {
    if (!searchTerm) return patients;

    return patients.filter((patient) => {
      const name = [
        patient.first_name,
        patient.middle_name,
        patient.last_name,
      ]
        .map(normalize)
        .filter(Boolean)
        .join(' ');
      const searchText = normalize(`${name} ${patient.email ?? ''}`);

      return (
        searchTokens.every((token) => searchText.includes(token)) ||
        name.includes(searchTerm) ||
        normalize(patient.first_name).includes(searchTerm) ||
        normalize(patient.middle_name).includes(searchTerm) ||
        normalize(patient.last_name).includes(searchTerm) ||
        normalize(patient.email).includes(searchTerm)
      );
    });
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
      data: filterPatients(mappedData),
    };
  } else if (userType === 'ADMIN') {
    const patients: SuperAdminPatientListProps[] = res.data;

    return {
      success: true,
      data: filterPatients(patients?.map((el) => ({
        id: el.id,
        first_name: el.first_name,
        middle_name: el.middle_name,
        last_name: el.last_name,
        email: el.email,
      }))),
    };
  } else {
    return {
      success: false,
      data: [],
    };
  }

};

export default getAllPatients;
