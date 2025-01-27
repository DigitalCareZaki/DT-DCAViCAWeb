'use server';

import fetch from '@fetch';
import type { GetSearchDoctor } from './types';

async function searchDoctor(search?: string): Promise<GetSearchDoctor> {
  const res = await fetch(
    `/api/v1/web/doctor/doctors?search=${search || ''}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default searchDoctor;
