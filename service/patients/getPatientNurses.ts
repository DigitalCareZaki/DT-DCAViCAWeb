'use server';

import fetch from '@fetch';
import type { GetPatientNurses } from '../types';

async function getPatientNurses(
  id: string,
  search?: string,
  type: string = 'doctor'
): Promise<GetPatientNurses> {
  const res = await fetch(
    `/api/v1/web/${type}/patients/nurses/${id}?search=${search || ''}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientNurses;
