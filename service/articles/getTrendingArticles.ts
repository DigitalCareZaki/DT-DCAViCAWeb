'use server';

import fetch from '@fetch';
import type { GetArticlesProps } from '../types';

async function getTrendingArticles(): Promise<GetArticlesProps> {
  const res = await fetch('/api/v1/web/education/trending-posts', {
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getTrendingArticles;
