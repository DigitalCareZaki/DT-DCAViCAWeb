'use server';

import fetch from '@fetch';

import type { GetTabletProps } from '../types';

import '@init-globals';

const getTablets = async (
  search?: string
): Promise<GetTabletProps> => {
  const res = await fetch(`/api/v1/web/tablets?search=${search ?? ''}`);

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getTablets;
