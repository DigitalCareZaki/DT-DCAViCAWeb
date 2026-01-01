'use server';

import fetch from '@fetch';
import type { GetOrganizationPatients } from '../types';

const getOrganizationPatients = async (
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<GetOrganizationPatients> => {
  let url = `/api/v1/web/organization/web-patients?page=${page}&limit=${limit}`;

  if (search) {
    url += `&search=${search}`;
  }

  const res = await fetch(url);

  const data = await res.json();

  return {
    data: data.data,
    success: res.ok,
    pagination: data.pagination,
  };
};

export default getOrganizationPatients;
