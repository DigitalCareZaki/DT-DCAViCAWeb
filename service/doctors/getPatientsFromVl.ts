'use server';

import fetch from '@fetch';

import type { GetVLAllPatients } from '@types-services';

async function getVlPatients(): Promise<GetVLAllPatients> {
  const res = await fetch('/api/v1/vl/patients', {
    cache: 'no-store',
  });

  const data = await res.json();

  console.log('Fetched VL patients:', data);

  return {
    success: res.ok,
    data,
  };
}

export default getVlPatients;
