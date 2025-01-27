'use server';

import fetch from '@fetch';

import type { GetRequestedAppointments } from '../types';

import '@init-globals';

async function getRequestedAppointments(): Promise<GetRequestedAppointments> {
  const res = await fetch('/api/v1/web/telemed/requested'.convertURI());

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getRequestedAppointments;
