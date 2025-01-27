'use server';

import fetch from '@fetch';

import type { ResetPasswordRequest } from '../types';

import '@init-globals';

async function resetPasswordRequest(
  payload: any
): Promise<ResetPasswordRequest> {
  const decodedData = await JSON.parse(
    Buffer.from(payload, 'base64').toString('utf-8')
  );

  const res = await fetch('/api/v1/web/auth/forgot-password'.convertURI(), {
    method: 'POST',
    body: JSON.stringify(decodedData),
    cache: 'no-cache',
  });

  const data = await res.json();

  return {
    success: res.ok,
    message: data?.message,
  };
}

export default resetPasswordRequest;
