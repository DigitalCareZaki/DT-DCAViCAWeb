'use server';

import fetch from '@fetch';

import type { ExistsPincodeProps } from '../types';

async function existsPincode(): Promise<ExistsPincodeProps> {
  const res = await fetch('/api/user/exists-pincode'.convertURI());
  await res.json();

  return {
    success: res.ok,
  };
}

export default existsPincode;
