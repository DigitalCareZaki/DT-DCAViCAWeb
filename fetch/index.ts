'use server';

import { cookies, headers } from 'next/headers';
import { acceptHeaders } from '@constants';

export default async function fetchWrapper(
  input: string | URL | Request,
  init?: RequestInit | undefined,
  dynamicHeader?: boolean
): Promise<Response> {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
  const requestHeaders = new Headers();
  const clientHeaders = headers();

  if (!dynamicHeader) {
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Accept', 'application/json');
  }

  clientHeaders.forEach((value, key) => {
    if (acceptHeaders.includes(key)) {
      requestHeaders.set(key, value);
    }
  });

  const token =
    clientHeaders.get('Authorization')?.toString() ||
    `Bearer ${cookies().get('jwt')?.value.toString()}`;

  requestHeaders.set('Authorization', token || '');

  // Merge custom headers from init if provided
  if (init?.headers) {
    const customHeaders = new Headers(init.headers);
    customHeaders.forEach((value, key) => {
      requestHeaders.set(key, value);
    });
  }

  return fetch(`${BASE_URL}${input}`, {
    ...init,
    headers: requestHeaders,
  });
}
