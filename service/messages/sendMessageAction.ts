'use server';

import fetch from '@fetch';

import type { SendMessageAction } from '../types';

async function sendMessageAction(
  id: string,
  type: 'starred' | 'delete' | 'unstarred'
): Promise<SendMessageAction> {
  try {
    const res = await fetch(
      `/api/v1/web/message/action/${id}?type=${type}`.convertURI(),
      {
        method: 'PATCH',
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return {
      success: true,
      message: '',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message ?? 'Something went wrong',
    };
  }
}

export default sendMessageAction;
