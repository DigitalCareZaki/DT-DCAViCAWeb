'use server';

import fetch from '@fetch';

import type { GetRequestedCalendar } from '../types';

import '@init-globals';

async function getReqCal(userId?: string): Promise<GetRequestedCalendar> {
  var queryS = userId ? `?userId=${userId}` : '';
  const res = await fetch(`/api/v1/web/telemed/calendar${queryS}`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getReqCal;
