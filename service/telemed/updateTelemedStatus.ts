'use server';

import fetch from '@fetch';
import type { UpdateMeetingStatusProps } from '../types';

import '@init-globals';

async function updateMeetingStatus(
  status: string,
  appointmentId: string
): Promise<UpdateMeetingStatusProps> {
  const res = await fetch(
    `/api/v1/web/telemed/meeting-update-status/${appointmentId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }
  );

  return {
    success: res.ok,
  };
}

export default updateMeetingStatus;
