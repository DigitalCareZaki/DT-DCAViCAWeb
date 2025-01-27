'use server';

import fetch from '@fetch';

import type { GetPatientReadingRangeProps } from '../types';

import '@init-globals';

const getPatientReadingRange = async (
  patientId: string
): Promise<GetPatientReadingRangeProps> => {
  const res = await fetch(
    `/api/v1/web/measurements/ranges/patients/${patientId}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getPatientReadingRange;
