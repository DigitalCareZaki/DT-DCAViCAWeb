'use server';

import fetch from '@fetch';

import type { GetPatientRecords } from '../types';

import '@init-globals';

async function getUserPatientRecords(
  patient_id?: string,
  page?: number,
  limit?: number,
  search?: string
): Promise<any> {
  const query = new URLSearchParams();

  if (patient_id) {
    query.set('patient_id', encodeURIComponent(patient_id));
    query.set('page', encodeURIComponent(page?.toString() || '1'));
    query.set('limit', encodeURIComponent(limit?.toString() || '10'));
  }

  if (search) {
    query.set('search', encodeURIComponent(search));
  }

  const res = await fetch(`/api/v1/web/emr?${query.toString()}`);

  const data = await res.json();


  return {
    success: res.ok,
    data,
  };
}

export default getUserPatientRecords;
