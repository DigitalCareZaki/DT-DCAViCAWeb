'use server';

import fetch from '@fetch';

import type { GetEmailsHistory } from '../types';

import '@init-globals';

async function getEmailsHistory(): Promise<GetEmailsHistory> {
  const res = await fetch(`/api/v1/web/emails/email-history`);

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getEmailsHistory;
