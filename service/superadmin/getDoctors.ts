'use server';

import fetch from '@fetch';

import type { GetOrganizationDoctors } from '../types';

const getOrganizationDoctor = async (): Promise<GetOrganizationDoctors> => {
  const res = await fetch(`/api/v1/web/organization/doctors`.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getOrganizationDoctor;
