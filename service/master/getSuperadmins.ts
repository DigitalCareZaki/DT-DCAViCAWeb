'use server';

import fetch from '@fetch';

import type { GetSuperAdminsProps } from '../types';

import '@init-globals';

async function getSuperAdmins(): Promise<GetSuperAdminsProps> {
  const res = await fetch('/api/v1/web/master/superadmins'.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getSuperAdmins;
