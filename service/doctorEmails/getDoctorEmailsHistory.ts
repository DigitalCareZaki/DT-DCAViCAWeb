'use server';

import fetch from '@fetch';

import type { GetEmailsHistory } from '../types';

import '@init-globals';

async function getDoctorEmailsHistory(userId: string): Promise<GetEmailsHistory> {
  const res = await fetch(`/api/v1/web/emails/email-history/${userId}`);

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getDoctorEmailsHistory;
