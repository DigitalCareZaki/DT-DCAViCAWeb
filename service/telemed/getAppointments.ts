'use server';

import fetch from '@fetch';

import type { GetAppointmentsProps } from '../types';

async function getAppointmentsProps(): Promise<GetAppointmentsProps> {
  const res = await fetch('/api/v1/web/telemed');

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getAppointmentsProps;
