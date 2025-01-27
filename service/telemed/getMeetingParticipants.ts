'use server';

import fetch from '@fetch';

import type { FetchMeetingParticipants } from '../types';

import '@init-globals';

async function getMeetingParticipants(
  id: string
): Promise<FetchMeetingParticipants> {
  const res = await fetch(
    `/api/v1/web/telemed/meeting-participants/${id}`.convertURI(),
    {
      cache: 'no-cache',
    }
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getMeetingParticipants;
