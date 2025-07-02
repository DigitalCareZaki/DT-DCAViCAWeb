'use server';

import fetch from '@fetch';

import type { GetNotifications } from '../types';

import '@init-globals';

async function getPatientNotifications(patient: string): Promise<any> {
  const res = await fetch(`/api/v1/web/notifications/${patient}`, {
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
