'use server';

import fetch from '@fetch';

import type { GetDepartmentBranchesProps } from '../types';

import '@init-globals';

const fetchDepartments = async (): Promise<GetDepartmentBranchesProps> => {
  const res = await fetch('/api/v1/web/departments/branches'.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default fetchDepartments;
