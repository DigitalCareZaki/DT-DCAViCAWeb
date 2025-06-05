'use server';

import fetch from '@fetch';

import { SuperAdminPatientListProps } from '@types';

async function getPatient(): Promise<{
  data: SuperAdminPatientListProps[];
  success: boolean;
}> {
  const res = await fetch('/api/v1/web/admin/patient'.convertURI());

  const data = await res.json();

  console.log('ress <<<<<<<<', data);

  return {
    success: res.ok,
    data,
  };
}

export default getPatient;
