'use server';

import fetch from '@fetch';

import type { GetPatientRes } from '../types';

async function getPatientList(
  userType: string = 'doctor'
): Promise<GetPatientRes> {
  const res = await fetch(
    `/api/v1/web/measurements/latestReadings`.convertURI() 
  );
  // const res = await fetch(`/api/v1/web/${userType}/patients`.convertURI()); 

  const data = await res.json();
  return {
    data: data,
    success: res.ok,
  };
}

export default getPatientList;
