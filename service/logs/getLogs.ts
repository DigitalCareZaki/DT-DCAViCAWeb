'use server';

import fetch from '@fetch';

import type { GetLogs } from '../types';

import '@init-globals';

async function getLogs(page: number = 1, limit: number = 10): Promise<GetLogs> {
  const res = await fetch(`/api/v1/web/logs?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getLogs;
