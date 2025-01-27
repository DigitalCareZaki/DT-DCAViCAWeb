'use server';

import fetch from '@fetch';

import type { SearchUsersMessagesProps } from '../types';

async function searchUsers(value: string): Promise<SearchUsersMessagesProps> {
  const res = await fetch(
    `/api/v1/web/message/search/users?value=${value}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default searchUsers;
