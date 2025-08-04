'use server';

import fetch from '@fetch';

import type { GetPatientMedicationProps } from '../types';

async function getPatientMedication(
  id: string,
  search?: string,
  page?: number,
  perPage?: number
): Promise<GetPatientMedicationProps> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (page) params.append('page', page.toString());
  if (perPage) params.append('perPage', perPage.toString());

  const url = `/api/v1/web/medications/patients/${id}?${params.toString()}`;

  const res = await fetch(url);

  const responseData = await res.json();

  return {
    success: res.ok,
    data: responseData.data || responseData,
    pagination: responseData.pagination || {
      totalItems: 0,
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    },
  };
}

export default getPatientMedication;
