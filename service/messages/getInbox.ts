'use server';

import fetch from '@fetch';
import type { GetInbox } from '../types';

async function getInbox(
  type: 'inbox' | 'starred' | 'sent',
  search?: string
): Promise<GetInbox> {
  const res = await fetch(
    `/api/v1/web/message/${type}?search=${search ?? ''}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getInbox;
