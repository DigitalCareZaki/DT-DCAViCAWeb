'use server';

import fetch from '@fetch';

import type { AddVideosProps } from '../types';

import '@init-globals';

const createVideo = async (data: any): Promise<AddVideosProps> => {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/videos'.convertURI(), {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    console.log('createVideo res', res);

    const body = await res.json();

    if (res.status !== 201) {
      throw new Error(body?.message?.toString() || 'Something went wrong');
    }

    return {
      success: true,
      data: body,
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
    };
  }
};

export default createVideo;
