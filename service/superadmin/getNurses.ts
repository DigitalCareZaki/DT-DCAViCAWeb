'use server';

import fetch from '@fetch';

import type { GetOrganizationNurses } from '../types';

const getOrganizationNurses = async (): Promise<GetOrganizationNurses> => {
  const res = await fetch(`/api/v1/web/organization/nurses`);

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getOrganizationNurses;
