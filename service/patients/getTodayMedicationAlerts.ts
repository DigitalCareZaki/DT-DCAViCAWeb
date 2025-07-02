'use server';

import fetch from '@fetch';

import type { GetPatientTodayMedicationAlerts } from '../types';

import '@init-globals';

async function getTodayMedicationAlerts(page: any, limit: any): Promise<any> {
  const res = await fetch(
    `/api/v1/web/patient/medications/alerts?page=${page}&limit=${limit}`
  );

  const data = await res.json();

  return {
    success: true,
    data,
  };
}

export default getTodayMedicationAlerts;
