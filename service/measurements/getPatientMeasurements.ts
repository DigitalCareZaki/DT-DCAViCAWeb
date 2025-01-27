'use server';

import fetch from '@fetch';

import type { GetPatientsMeasurementsProps } from '../types';

async function getPatientsMeasurements(
  id: string,
  type: string
): Promise<GetPatientsMeasurementsProps> {
  const res = await fetch(
    `/api/v1/web/measurements/patients/${id}${type === 'ALL' ? '' : `?type=${type}`}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientsMeasurements;
