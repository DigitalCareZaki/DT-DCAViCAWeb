'use server';

import fetch from '@fetch';

import type { GetDoctorRagsProps } from '../types';

async function getSinglePatientRag(
  patientId: string
): Promise<GetDoctorRagsProps> {
  const res = await fetch(`/api/v1/web/rag/patients/${patientId}`);

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getSinglePatientRag;
