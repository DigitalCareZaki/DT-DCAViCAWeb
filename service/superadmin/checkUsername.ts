'use server';

import fetch from '@fetch';

import '@init-globals';

interface CheckUsernameResult {
  exists: boolean;
  success: boolean;
  message?: string;
}

async function checkUsername(username: string): Promise<CheckUsernameResult> {
  try {
    const res = await fetch(`/api/v1/web/users/check-username/${encodeURIComponent(username)}`, {
      method: 'GET',
      cache: 'no-cache',
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body?.message?.toString());
    }

    return {
      success: true,
      exists: body?.exists ?? false,
    };
  } catch (err: any) {
    return {
      success: false,
      exists: false,
      message: err?.message,
    };
  }
}

export default checkUsername;
