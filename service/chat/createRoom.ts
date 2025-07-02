'use server';

import fetch from '@fetch';

import type { CreateRoomProps } from '../types';

import '@init-globals';

async function createRoom(data: any): Promise<CreateRoomProps> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/chat/room', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({
        ...decodedData,
      }),
    });

    const body = await res.json();

    if (res.status !== 201) {
      throw new Error(body?.message ?? 'Something went wrong');
    }

    return {
      success: true,
      data: body,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
      data: null,
    };
  }
}

export default createRoom;
