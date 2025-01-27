'use server';

import fetch from '@fetch';

import type { GetSelectOrganizations } from '../types';

import '@init-globals';

async function getSelectOrganizations(): Promise<GetSelectOrganizations> {
  const res = await fetch('/api/v1/web/master/get-organizations'.convertURI());

  const data = await res.json();

  return {
    success: data.success,
    data: data,
  };
}

export default getSelectOrganizations;
