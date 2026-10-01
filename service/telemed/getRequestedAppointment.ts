'use server';

import fetch from '@fetch';

import type { GetRequestedAppointments } from '../types';

import '@init-globals';

type GetRequestedAppointmentsParams = {
  pending?: boolean;
  search?: string;
  date?: string; // YYYY-MM-DD
};

async function getRequestedAppointments({
  pending,
  search,
  date,
}: GetRequestedAppointmentsParams = {}): Promise<GetRequestedAppointments> {
  const params = new URLSearchParams();

  if (pending !== undefined) params.append('pending', String(pending));
  if (search) params.append('search', search);
  if (date) params.append('date', date);

  const query = params.toString();
  const url = `/api/v1/web/telemed/requested${query ? `?${query}` : ''}`;

  const res = await fetch(url, {
    cache: 'no-store',
  });
  const data = await res.json();
  return {
    data,
    success: res.ok,
  };
}

export default getRequestedAppointments;
