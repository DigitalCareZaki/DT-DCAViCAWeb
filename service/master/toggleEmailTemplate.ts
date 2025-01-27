'use server';

import fetch from '@fetch';

import type { GetToggleEmailTemplate } from '../types';

import '@init-globals';

async function toggleEmailTemplate(
  payload: any
): Promise<GetToggleEmailTemplate> {
  const decodedData = await JSON.parse(
    Buffer.from(payload, 'base64').toString('utf-8')
  );

  const res = await fetch(
    '/api/v1/web/master/toggle-email-template'.convertURI(),
    {
      method: 'PATCH',
      body: JSON.stringify(decodedData),
    }
  );

  const data = await res.json();

  return {
    success: res.ok,
    message: data?.message,
  };
}

export default toggleEmailTemplate;
