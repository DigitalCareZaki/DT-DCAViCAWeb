'use server';

import fetch from '@fetch';

import '@init-globals';

import type { GetOrganizationDepartments } from '../types';

async function getOrganizationDepartments(
  branchId: string
): Promise<GetOrganizationDepartments> {
  const res = await fetch(
    `/api/v1/web/organization/departments/${branchId}`
  );

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getOrganizationDepartments;
