'use server';

import fetch from '@fetch';

import type { FetchMeetingChatsProps } from '../types';

async function fetchMeetingChats(id: string): Promise<FetchMeetingChatsProps> {
  const res = await fetch(
    `/api/v1/web/telemed/meeting-discussion/${id}`.convertURI()
  );

  const data = await res.json();

  return {
    data: {
      chats: data?.chats ?? [],
    },
    success: res.ok,
  };
}

export default fetchMeetingChats;
