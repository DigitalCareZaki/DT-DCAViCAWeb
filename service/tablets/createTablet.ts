'use server';

import fetch from '@fetch';

import type { AddTabletProps } from '../types';

import '@init-globals';

const createTablet = async (data: any): Promise<AddTabletProps> => {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/tablets', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

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
      message: err?.message,
    };
  }
};

export default createTablet;
