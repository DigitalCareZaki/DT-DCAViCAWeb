'use server';

import fetch from '@fetch';

import type { AddTechnicalSupportQueryProps } from '../types';

import '@init-globals';

const createSupportQuery = async (
  data: any
): Promise<AddTechnicalSupportQueryProps> => {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/support', {
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
    };
  } catch (err: any) {
    return {
      success: false,
    };
  }
};

export default createSupportQuery;
