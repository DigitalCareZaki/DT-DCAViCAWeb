'use server';

import fetch from '@fetch';

import type { GetNotifications } from '../types';

import '@init-globals';

async function getPatientsSms(patient: string): Promise<any> {
  const res = await fetch(`/api/v1/web/sms/${patient}`.convertURI(), {
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

export default getPatientsSms;
