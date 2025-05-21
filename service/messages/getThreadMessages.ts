'use server';

import fetch from '@fetch';
import type { GetInbox } from '../types';

async function getThreadMessages(messageId: string): Promise<GetInbox> {
  const res = await fetch(
    `/api/v1/web/message/thread?messageId=${messageId}`.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getThreadMessages;
