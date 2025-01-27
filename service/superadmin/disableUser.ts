'use server';

import fetch from '@fetch';

import '@init-globals';

async function disableUser(id: string): Promise<any> {
  try {
    const res = await fetch(
      `/api/v1/web/organization/disable-user?id=${id}`.convertURI(),
      {
        cache: 'no-cache',
      }
    );

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body?.message?.toString());
    }

    return {
      success: res.ok,
      active: body?.active,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Something went wrong',
    };
  }
}

export default disableUser;
