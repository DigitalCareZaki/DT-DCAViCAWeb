'use server';

import fetch from '@fetch';

import { OrganizationMedicine } from '../types';

async function getOrganizationMedicine(
  query: string
): Promise<OrganizationMedicine> {
  const params = new URLSearchParams();

  params.append('search', query);

  const res = await fetch(
    `/api/v1/web/doctor/organization/medications?${params.toString()}`.convertURI()
  );

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getOrganizationMedicine;
