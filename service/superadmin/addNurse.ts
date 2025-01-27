'use server';

import fetch from '@fetch';

import '@init-globals';

import type { AddDataProps } from '../types';

async function addNurse(data: any): Promise<AddDataProps> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch(`/api/v1/web/organization/nurse`.convertURI(), {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    const body = await res.json();

    if (res.status !== 201) {
      throw new Error(body?.message?.toString());
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

export default addNurse;
