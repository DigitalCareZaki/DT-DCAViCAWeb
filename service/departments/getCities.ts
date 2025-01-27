'use server';

import fetch from '@fetch';

import type { GetDepartmentBranchesProps } from '../types';

import '@init-globals';

const fetchCities = async (): Promise<GetDepartmentBranchesProps> => {
  const res = await fetch('/api/v1/web/departments/cities'.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default fetchCities;
