'use server';

import fetch from '@fetch';

import type { GetDepartmentsProps } from '../types';

import '@init-globals';

const getPatientReadingAlerts = async (
  search?: string
): Promise<GetDepartmentsProps> => {
  const res = await fetch(
    `/api/v1/web/departments?search=${search ?? ''}`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getPatientReadingAlerts;
