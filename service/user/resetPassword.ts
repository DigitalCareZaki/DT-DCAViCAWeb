'use server';

import fetch from '@fetch';

import type { ResetPassword } from '../types';

import '@init-globals';

async function resetPassword(payload: any): Promise<ResetPassword> {
  const decodedData = await JSON.parse(
    Buffer.from(payload, 'base64').toString('utf-8')
  );

  const res = await fetch('/api/v1/web/auth/reset-password', {
    method: 'PATCH',
    body: JSON.stringify(decodedData),
    cache: 'no-cache',
  });

  const data = await res.json();

  return {
    success: res.ok,
    message: data?.message,
  };
}

export default resetPassword;
