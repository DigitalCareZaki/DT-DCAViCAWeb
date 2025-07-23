'use server';

import fetch from '@fetch';

import type { GetNotifications } from '../types';

import '@init-globals';

async function getNotificationsProps(page: number = 1, limit: number = 10): Promise<GetNotifications> {
  const res = await fetch(`/api/v1/web/notifications?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getNotificationsProps;
