'use server';

import fetch from '@fetch';
import type { GetOrganizationPatients } from '../types';

const getOrganizationPatients = async (): Promise<GetOrganizationPatients> => {
  const res = await fetch(`/api/v1/web/organization/web-patients`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getOrganizationPatients;
