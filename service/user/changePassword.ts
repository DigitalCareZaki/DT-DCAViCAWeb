'use server';

import fetch from '@fetch';

import '@init-globals';

async function changePassword(data: any) {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/auth/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        ...decodedData,
      }),
      cache: 'no-cache',
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body?.message ?? 'Unable to change password');
    }

    return {
      success: true,
      ...body,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Something went wrong',
    };
  }
}

export default changePassword;
