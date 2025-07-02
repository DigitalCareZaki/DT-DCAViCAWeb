'use server';

import fetch from '@fetch';
import type { GetSearchDoctor } from './types';

async function selectNurseByDoctor(specialityId: string): Promise<any> {
  const res = await fetch(
    `/api/v1/web/nurse/nurses/speciality?specialityId=${specialityId}`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default selectNurseByDoctor;
