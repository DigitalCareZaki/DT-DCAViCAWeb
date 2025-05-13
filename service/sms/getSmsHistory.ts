'use server';

import fetch from '@fetch';
import '@init-globals';

async function getSmsHistory(page: any, limit: any): Promise<any> {
  const res = await fetch(`/api/v1/web/sms/logs?page=${page}&limit=${limit}`.convertURI());

  const data = await res.json();

  console.log('check how to do this', data);

  return {
    success: res.ok,
    data: data,
  };
}

export default getSmsHistory;
