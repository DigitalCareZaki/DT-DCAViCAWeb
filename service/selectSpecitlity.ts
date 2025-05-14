'use server';

import fetch from '@fetch';
import type { GetSearchDoctor } from './types';

async function selectSpecitlity(): Promise<any> {
  const res = await fetch(
    `/api/v1/web/doctor/speciality`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default selectSpecitlity;
