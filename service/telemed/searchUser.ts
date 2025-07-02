'use server';

import fetch from '@fetch';

import { TelemedSearchUsersProps } from '../types';

async function searchUsers(query: string): Promise<TelemedSearchUsersProps> {
  const params = new URLSearchParams();

  params.append('q', query);

  const res = await fetch(
    `/api/v1/web/telemed/search?${params.toString()}`
  );

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default searchUsers;
