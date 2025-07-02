'use server';

import fetch from '@fetch';
import type { GetAppointmentStats } from '../types';

async function getAppointmentStats(
  userType: string
): Promise<GetAppointmentStats> {
  const res = await fetch(`/api/v1/web/${userType}/stats`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getAppointmentStats;
