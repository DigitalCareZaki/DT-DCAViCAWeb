'use server';

import fetch from '@fetch';

import type { GetLatestPatientMeasurement } from '../types';

import '@init-globals';

async function getLatestMeasurement(
  id: string
): Promise<GetLatestPatientMeasurement> {
  const res = await fetch(
    `/api/v1/web/telemed/patient/recent-measurement/${id}`
  );

  const data = await res.json();

  return {
    success: true,
    data: data?.measurements,
  };
}

export default getLatestMeasurement;
