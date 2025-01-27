'use server';

import fetch from '@fetch';

import '@init-globals';

import type { GetCurrentOrganization } from '../types';

async function getCurrentOrganization(): Promise<GetCurrentOrganization> {
  const res = await fetch('/api/v1/web/organization'.convertURI());

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getCurrentOrganization;
