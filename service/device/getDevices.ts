'use server';

import fetch from '@fetch';

import type { GetDeviceProps } from '../types';

import '@init-globals';

const getDevices = async (
  page: number = 1,
  perPage: number = 10,
  search?: string
): Promise<GetDeviceProps & { pagination?: any }> => {
  const res = await fetch(`/api/v1/web/devices?page=${page}&perPage=${perPage}${search ? `&search=${search}` : ''}`);

  const data = await res.json();

  return {
    success: res.ok,
    data: data.data,
    pagination: data.pagination,
  };
};

export default getDevices;
