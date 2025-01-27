'use server';

import fetch from '@fetch';

import type { GetVLAllPatients } from '@types-services';

async function getVlPatients(): Promise<GetVLAllPatients> {
  const res = await fetch('/api/v1/vl/patients'.convertURI(), {
    cache: 'no-store',
  });

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getVlPatients;
