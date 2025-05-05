'use server';

import fetch from '@fetch';

import type { GetBranchesProps } from '../types';

import '@init-globals';

const getBranchesSuperAdmin = async (search: string = ''): Promise<GetBranchesProps> => {
  const res = await fetch(`/api/v1/web/master/branches`.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getBranchesSuperAdmin;
