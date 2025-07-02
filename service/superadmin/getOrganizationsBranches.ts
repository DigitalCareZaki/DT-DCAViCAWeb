'use server';

import fetch from '@fetch';

import type { GetOrganizationBranches } from '../types';

const getOrganizationBranches = async (): Promise<GetOrganizationBranches> => {
  const res = await fetch('/api/v1/web/organization/branches');

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getOrganizationBranches;
