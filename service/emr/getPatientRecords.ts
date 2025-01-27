'use server';

import fetch from '@fetch';

import type { GetPatientRecords } from '../types';

import '@init-globals';

async function getUserPatientRecords(
  patient_id?: string,
  search?: string
): Promise<GetPatientRecords> {
  const query = new URLSearchParams();

  if (patient_id) {
    query.set('patient_id', encodeURIComponent(patient_id));
  }

  if (search) {
    query.set('search', encodeURIComponent(search));
  }

  console.log(query.toString());

  const res = await fetch(`/api/v1/web/emr?${query.toString()}`.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getUserPatientRecords;
