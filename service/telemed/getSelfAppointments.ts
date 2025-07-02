'use server';

import fetch from '@fetch';

import type { GetSelfAppointments } from '../types';

import '@init-globals';

async function getSelfAppointmentsProps(): Promise<GetSelfAppointments> {
  const res = await fetch('/api/v1/web/telemed');

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getSelfAppointmentsProps;
