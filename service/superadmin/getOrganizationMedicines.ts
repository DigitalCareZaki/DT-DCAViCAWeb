'use server';

import fetch from '@fetch';

import { OrganizationMedicine } from '../types';

const getOrganizationMedicines = async (page: number = 1, limit: number = 10): Promise<OrganizationMedicine> => {
  const res = await fetch(`/api/v1/web/organization/medicines?page=${page}&limit=${limit}`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getOrganizationMedicines;
