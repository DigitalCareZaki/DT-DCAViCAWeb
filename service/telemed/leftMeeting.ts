'use server';

import fetch from '@fetch';

import type { LeftMeetingProps } from '../types';

import '@init-globals';

async function leftMeeting(id: string): Promise<LeftMeetingProps> {
  try {
    const res = await fetch(`/api/v1/web/telemed/left-meeting/${id}`, {
      cache: 'no-cache',
    });

    const data = await res.json();

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}

export default leftMeeting;
