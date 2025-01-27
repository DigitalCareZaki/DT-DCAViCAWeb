'use server';

import fetch from '@fetch';

import type { GetMasterStatistics } from '../types';

import '@init-globals';

async function getStats(): Promise<GetMasterStatistics> {
  const res = await fetch('/api/v1/web/master/statistics'.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getStats;
