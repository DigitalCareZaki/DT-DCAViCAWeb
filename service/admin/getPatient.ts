'use server';

import fetch from '@fetch';

import { SuperAdminPatientListProps } from '@types';

async function getPatient(page = 1, limit = 10): Promise<{
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
  const res = await fetch(`/api/v1/web/admin/patient?page=${page}&limit=${limit}`);

  const data = await res.json();

  return {
    success: res.ok,
    data: data.data,
    pagination: data.pagination,
  };
}

export default getPatient;
