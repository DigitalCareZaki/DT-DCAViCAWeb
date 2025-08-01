'use server';

import fetch from '@fetch';
import '@init-globals';

async function getVitals(appointmentId: any): Promise<any> {
  const res = await fetch(
    `/api/v1/web/measurements/last?appointmentId=${appointmentId}`

  );

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getVitals;
