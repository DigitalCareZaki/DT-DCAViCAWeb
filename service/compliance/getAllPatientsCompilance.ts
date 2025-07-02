'use server';

import fetch from '@fetch';

import type { GetDoctorCombinedComplianceProps } from '../types';

async function getAllPatientsCompliance(): Promise<GetDoctorCombinedComplianceProps> {
  const res = await fetch(`/api/v1/web/compliance?type=weekly`);

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getAllPatientsCompliance;
