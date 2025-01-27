'use server';

import fetch from '@fetch';
import type { GetPatientDoctors } from '../types';

async function getPatientDoctors(
  id: string,
  search?: string,
  type: string = 'doctor'
): Promise<GetPatientDoctors> {
  const res = await fetch(
    `/api/v1/web/${type}/patients/doctors/${id}?search=${search || ''}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientDoctors;
