'use server';

import fetch from '@fetch';

import type { GetPatientRes } from '../types';
const queryParams = new URLSearchParams();

async function getPatientList(
  userType: string = 'doctor',
  page?: number,
  limit?: number
): Promise<any> {

  const url = `/api/v1/web/measurements/latestReadings?page=${page}&limit=${limit}`;


  const res = await fetch(url);

  console.log('res from getPatientList >>>>>>>>>> ', res);

  // const res = await fetch(`/api/v1/web/${userType}/patients`); 

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getPatientList;
