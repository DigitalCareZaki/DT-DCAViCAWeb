'use server';

import fetch from '@fetch';

import { SuperAdminPatientListProps } from '@types';

async function getPatient(page = 1, limit = 10, search?: string): Promise<{
  data: SuperAdminPatientListProps[];
  pagination: {
    totalItems: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
  success: boolean;
}> {
  let url = `/api/v1/web/admin/patient?page=${page}&limit=${limit}`;

  if (search) {
    url += `&search=${search}`;
  }

  const res = await fetch(url);

  const data = await res.json();

  return {
    success: res.ok,
    data: data.data,
    pagination: data.pagination,
  };
}

export default getPatient;
