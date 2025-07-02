'use server';

import fetch from '@fetch';

import type { GetPatientContacts } from '../types';

async function getPatientContacts(
  id: string,
  search?: string,
  type: string = 'doctor'
): Promise<GetPatientContacts> {
  const res = await fetch(
    `/api/v1/web/${type}/patients/contacts/${id}?search=${search || ''}`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientContacts;
