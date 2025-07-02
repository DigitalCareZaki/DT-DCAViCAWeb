'use server';

import fetch from '@fetch';

import type { UpdateTelemedActionProps } from '../types';

import '@init-globals';

async function updateTelemedAction(
  data: any
): Promise<UpdateTelemedActionProps> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/telemed/action', {
      method: 'PATCH',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    const body = await res.json();

    if (res.status !== 200)
      throw new Error(body?.message?.toString() ?? 'Something went wrong');

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
    };
  }
}

export default updateTelemedAction;
