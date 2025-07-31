'use server';

import fetch from '@fetch';

import type { GetNotifications } from '../types';

import '@init-globals';

async function getPatientNotifications(
  patient: string, 
  page: number = 1, 
  limit: number = 10
): Promise<any> {
  const res = await fetch(`/api/v1/web/notifications/${patient}?page=${page}&limit=${limit}`, {
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientNotifications;
