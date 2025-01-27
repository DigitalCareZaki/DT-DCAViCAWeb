'use server';

import fetch from '@fetch';

import type { GetOrganizationProps } from '../types';

import '@init-globals';

async function getOrganization(): Promise<GetOrganizationProps> {
  const res = await fetch('/api/v1/web/master/organizations'.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getOrganization;
