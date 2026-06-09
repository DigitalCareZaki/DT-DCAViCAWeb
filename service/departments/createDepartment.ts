'use server';

import fetch from '@fetch';

import '@init-globals';

import type { AddDataProps } from '../types';

const getApiMessage = (body: any): string | undefined => {
  if (Array.isArray(body?.message)) {
    return body.message.join(', ');
  }

  return body?.message || body?.error || JSON.stringify(body);
};

const isApiError = (res: Response, body: any): boolean => {
  const statusCode = Number(body?.statusCode ?? res.status);

  return !res.ok || statusCode >= 400;
};

async function addDepartment(data: any): Promise<AddDataProps> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch(`/api/v1/web/departments`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    const body = await res.json();

    const message = getApiMessage(body);

    if (isApiError(res, body)) {
      throw new Error(message);
    }

    return {
      success: true,
      message,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
    };
  }
}

export default addDepartment;
