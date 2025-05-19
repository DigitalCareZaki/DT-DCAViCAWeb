'use server';

import fetch from '@fetch';
import type { GetSearchDoctor } from './types';

async function selectNurse(specialityId: string): Promise<any> {
  const res = await fetch(
    `/api/v1/web/doctor/nurse/speciality?specialityId=${specialityId}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default selectNurse;
