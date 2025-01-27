'use server';

import fetch from '@fetch';
import { FetchRoomsProps } from '../types';

import '@init-globals';

async function fetchRooms(): Promise<FetchRoomsProps> {
  const res = await fetch('/api/v1/web/chat/room'.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data: data ?? [],
  };
}

export default fetchRooms;
