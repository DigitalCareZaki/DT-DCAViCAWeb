'use server';

import fetch from '@fetch';

import type { GetTabletProps } from '../types';

import '@init-globals';

const getTablets = async (
  page: number = 1,
  perPage: number = 10,
  search?: string
): Promise<GetTabletProps & { pagination?: any }> => {
  const res = await fetch(`/api/v1/web/tablets?page=${page}&perPage=${perPage}${search ? `&search=${search}` : ''}`);

  const data = await res.json();

  return {
    success: res.ok,
    data: data.data,
    pagination: data.pagination,
  };
};

export default getTablets;
