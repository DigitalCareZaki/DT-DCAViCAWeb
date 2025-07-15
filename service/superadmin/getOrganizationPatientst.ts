'use server';

import fetch from '@fetch';
import type { GetOrganizationPatients } from '../types';

const getOrganizationPatients = async (
  page: number = 1,
  limit: number = 10
): Promise<GetOrganizationPatients> => {
  const res = await fetch(`/api/v1/web/organization/web-patients?page=${page}&limit=${limit}`);

  const data = await res.json();

  return {
    data: data.data,
    success: res.ok,
    pagination: data.pagination,
  };
};

export default getOrganizationPatients;
