'use server';

import fetch from '@fetch';

import type { GetPatientRes } from '../types';
const queryParams = new URLSearchParams();

async function getPatientList(
  userType: string = 'doctor',
  page: number,
  limit: number
): Promise<any> {

  const queryParams = new URLSearchParams();

  queryParams.set('page', page.toString());
  queryParams.set('limit', limit.toString());

  const url = `/api/v1/web/measurements/latestReadings?${queryParams.toString()}`;
    
  console.log('patient kia url kia ban rhaa han service ma',url);

  const res = await fetch(url.convertURI());
  // const res = await fetch(`/api/v1/web/${userType}/patients`.convertURI()); 

  const data = await res.json();

  return {
    success: res.ok,
     data: data,
  };
}

export default getPatientList;
