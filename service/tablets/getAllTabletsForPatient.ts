'use server';

import fetch from '@fetch';

import type { GetTabletProps } from '../types';

import '@init-globals';

const getAllTabletsForPatient = async (
  patientId: string
): Promise<GetTabletProps> => {
  const res = await fetch(
    `/api/v1/web/tablets/patients/${patientId}`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getAllTabletsForPatient;
