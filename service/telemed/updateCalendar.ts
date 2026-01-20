'use server';

import fetch from '@fetch';

import '@init-globals';

import type { AddDataProps } from '../types';

async function addCalendar(data: any): Promise<AddDataProps> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    console.log('decodedData', JSON.stringify(decodedData));

    const res = await fetch(`/api/v1/web/telemed/calendar`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body?.message?.toString() || 'An error occurred during the update');
    }

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

export default addCalendar;
