'use server';

import fetch from '@fetch';

import type { GetDoctorCompliancePerPillProps } from '../types';

async function getCompliancePerPill(
  patientId: string
): Promise<GetDoctorCompliancePerPillProps> {
  const res = await fetch(
    `/api/v1/web/compliance/patients/${patientId}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getCompliancePerPill;
