'use server';

import fetch from '@fetch';
import type { GetSearchNurse } from './types';

async function searchNurse(search?: string): Promise<GetSearchNurse> {
  const res = await fetch(
    `/api/v1/web/doctor/nurses?search=${search || ''}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default searchNurse;
