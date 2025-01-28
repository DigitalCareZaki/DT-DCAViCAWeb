'use server';

import { cookies, headers } from 'next/headers';
import { acceptHeaders } from '@constants';

export default async function fetchWrapper(
  input: string | URL | Request,
  init?: RequestInit | undefined,
  dynamicHeader?: boolean
): Promise<Response> {
  console.log('fetchWrapper API >>>>>>>>>> ', input);
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

  return fetch(input, {
    headers: requestHeaders,
    ...init,
  });
}
