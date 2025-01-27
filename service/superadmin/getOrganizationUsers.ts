'use server';

import fetch from '@fetch';
import { GetOrganizationUsers } from '../types';

const getOrganizationUsers = async (
  search: string = '',
  role: string = ''
): Promise<GetOrganizationUsers> => {
  const res = await fetch(
    `/api/v1/web/organization/users?search=${search}&role=${role}`.convertURI()
  );

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getOrganizationUsers;
