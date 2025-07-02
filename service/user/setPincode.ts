'use server';

import fetch from '@fetch';

import type { VerifyPincodeProps } from '../types';

import '@init-globals';

async function setPincode(payload: string): Promise<VerifyPincodeProps> {
  const decodedPayload = await JSON.parse(
    Buffer.from(payload, 'base64').toString('utf-8')
  );

  const res = await fetch('/api/v1/web/auth/set-pincode', {
    method: 'PATCH',
    body: JSON.stringify(decodedPayload),
    cache: 'no-cache',
  });

  const data = await res.json();

  return {
    success: res.ok,
    message: data?.message ?? '',
  };
}

export default setPincode;
