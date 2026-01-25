'use server';

import fetch from '@fetch';
import type { GetArticlesProps } from '../types';

async function getArticles(): Promise<GetArticlesProps> {
  const res = await fetch('/api/v1/web/articles', {
    cache: 'no-store',
  });

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getArticles;
