'use server';

import fetch from '@fetch';

import type { SearchRoomsProps } from '../types';

import '@init-globals';

async function searchRooms(search: string): Promise<SearchRoomsProps> {
  const res = await fetch(
    `/api/v1/web/chat/search/users?search=${search}`.convertURI()
  );

  const data = await res.json();

  const computed = data?.map((el: any) => ({
    users: [el],
    id: null,
  }));

  return {
    success: res.ok,
    data: computed,
  };
}

export default searchRooms;
