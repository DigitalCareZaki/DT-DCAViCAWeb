'use server';

import { cookies } from 'next/headers';
import { } from '@init-globals';

export async function login(data: any) {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const cookieStore = cookies();



    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/web/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        ...decodedData,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Adjust based on your server expectations
      },
      cache: 'no-cache',
    });

    const body = await res.json();

    if (!res.ok || !body?.token?.length) {
      throw new Error(body?.status === 404 ? 'User not found' : body?.message);
    }

    cookieStore.set('jwt', body.token, {
      maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
      httpOnly: false,
      secure: false,
      path: '/',
    });

    return {
      token: body?.token,
      type: body?.role,
      message: null,
    };
  } catch (err: any) {
    return {
      token: null,
      type: null,
      message: err?.message || 'Something went wrong',
    };
  }
}
