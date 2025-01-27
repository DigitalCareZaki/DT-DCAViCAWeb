'use server';

import fetch from '@fetch';

import type { GetSuperAdminStats } from '../types';

async function getStats(role: string): Promise<GetSuperAdminStats> {
  const res = await fetch(
    `/api/v1/web/${role?.toLowerCase()}/stats`.convertURI()
  );

  const data = await res.json();

  return {
    data: data?.data,
    success: res.ok,
  };
}

export default getStats;
