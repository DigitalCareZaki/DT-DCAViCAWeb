'use server';

import fetch from '@fetch';

import type { JoinMeetingProps } from '../types';

import '@init-globals';

async function joinMeeting(id: string): Promise<JoinMeetingProps> {
  const res = await fetch(
    `/api/v1/web/telemed/join-meeting/${id}`,
    {
      cache: 'no-cache',
    }
  );

  const data = await res.json();

  return {
    success: data?.created ?? false,
  };
}

export default joinMeeting;
