'use server';

import fetch from '@fetch';

import type { VerifyPincodeProps } from '../types';

import '@init-globals';

async function verifyPincode(payload: string): Promise<VerifyPincodeProps> {
  const decodedPayload = await JSON.parse(
    Buffer.from(payload, 'base64').toString('utf-8')
  );

  const res = await fetch('/api/v1/web/auth/verify-pincode', {
    method: 'PATCH',
    body: JSON.stringify(decodedPayload),
    cache: 'no-cache',
  });

  const data = await res.json();

  console.log('data verify pincode >>>>', data);

  return {
    success: res.ok,
    message: data?.message ?? '',
  };
}

export default verifyPincode;
