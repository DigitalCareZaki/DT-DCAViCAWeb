'use server';

import fetch from '@fetch';

import type { GetEmailsHistory } from '../types';

import '@init-globals';

async function getEmailsHistory(page: number, limit: number): Promise<GetEmailsHistory> {
  const res = await fetch(`/api/v1/web/emails/email-history?page=${page}&limit=${limit}`);

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getEmailsHistory;
