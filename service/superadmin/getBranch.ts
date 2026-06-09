'use server';

import fetch from '@fetch';

import type { GetBranchProps } from '../types';

import '@init-globals';

const getBranch = async (id: string): Promise<GetBranchProps> => {
  const res = await fetch(`/api/v1/web/superadmin/branches/${id}`);

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getBranch;
