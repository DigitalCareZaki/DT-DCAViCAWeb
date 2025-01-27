'use server';

import fetch from '@fetch';
import type { GetArticlesProps } from '../types';

async function getMyArticles(): Promise<GetArticlesProps> {
  const res = await fetch('/api/v1/web/education/my-posts'.convertURI(), {
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

export default getMyArticles;
