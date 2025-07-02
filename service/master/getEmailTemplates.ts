'use server';

import fetch from '@fetch';

import type { GetEmailTemplatesProps } from '../types';

import '@init-globals';

async function getEmailTemplates(): Promise<GetEmailTemplatesProps> {
  const res = await fetch('/api/v1/web/master/email-templates');

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getEmailTemplates;
