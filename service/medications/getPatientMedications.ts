'use server';

import fetch from '@fetch';

import type { GetPatientMedicationProps } from '../types';

async function getPatientMedication(
  id: string,
  search?: string
): Promise<GetPatientMedicationProps> {
  const res = await fetch(
    `/api/v1/web/medications/patients/${id}?search=${search || ''}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientMedication;
