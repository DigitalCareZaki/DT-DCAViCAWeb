'use server';

import fetch from '@fetch';

import type { GetRequestedAppointments } from '../types';

import '@init-globals';

async function getRequestedAppointments({ pending }: { pending?: boolean } = {}): Promise<GetRequestedAppointments> {
  let url = '/api/v1/web/telemed/requested';
  if (pending !== undefined) {
    url += `?pending=${pending}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return {
    data,
    success: res.ok,
  };
}

export default getRequestedAppointments;
