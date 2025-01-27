'use server';

import fetch from '@fetch';

import type { GetLogs } from '../types';

import '@init-globals';

async function getLogs(): Promise<GetLogs> {
  const res = await fetch('/api/v1/web/logs'.convertURI(), {
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getLogs;
