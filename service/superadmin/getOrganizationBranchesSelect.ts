'use server';

import fetch from '@fetch';

import type { GetOrganizationBranchesSelect } from '../types';

const getOrganizationBranchesSelect =
  async (): Promise<GetOrganizationBranchesSelect> => {
    const res = await fetch(
      '/api/v1/web/organization/branches/select'.convertURI()
    );

    const data = await res.json();

    return {
      data,
      success: res.ok,
    };
  };

export default getOrganizationBranchesSelect;
