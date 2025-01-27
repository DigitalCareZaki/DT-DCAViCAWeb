'use server';

import fetch from '@fetch';

import type { SearchArticileProps } from '../types';

import '@init-globals';

async function searchArticle(value: string): Promise<SearchArticileProps> {
  const res = await fetch(
    `/api/v1/web/education/search?value=${encodeURIComponent(value)}`.convertURI(),
    {
      method: 'GET',
    }
  );

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default searchArticle;
