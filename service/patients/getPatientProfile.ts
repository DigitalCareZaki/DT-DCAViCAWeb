'use server';

import fetch from '@fetch';

import type { GetPatientProfile } from '../types';

async function getPatientProfile(
  id: string,
  userType: string = 'doctor'
): Promise<GetPatientProfile> {
  console.log(`/api/v1/web/${userType}/patients/profile/${id}`.convertURI());
  console.log('URL');

  const res = await fetch(
    `/api/v1/web/${userType}/patients/profile/${id}`.convertURI()
  );

  const data = await res.json();

  return {
    data: data,
    success: res.ok,
  };
}

export default getPatientProfile;
