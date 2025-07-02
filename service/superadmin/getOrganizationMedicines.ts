'use server';

import fetch from '@fetch';

import { OrganizationMedicine } from '../types';

const getOrganizationMedicines = async (): Promise<OrganizationMedicine> => {
  const res = await fetch('/api/v1/web/organization/medicines');

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getOrganizationMedicines;
