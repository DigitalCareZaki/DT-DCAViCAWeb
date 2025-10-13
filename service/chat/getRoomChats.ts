'use server';

import fetch from '@fetch';

import type { GetRoomChats } from '../types';

import '@init-globals';

async function fetchRoomChats(roomId: string): Promise<GetRoomChats> {
  const res = await fetch(`/api/v1/web/chat/room/${roomId}`);

  const data = await res.json();


  return {
    success: res.ok,
    data: data ?? [],
  };
}

export default fetchRoomChats;
