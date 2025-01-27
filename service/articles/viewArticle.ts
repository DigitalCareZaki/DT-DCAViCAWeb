'use server';

import fetch from '@fetch';
import type { ViewArticleProps } from '../types';

async function viewArticle(id: string): Promise<ViewArticleProps> {
  const res = await fetch(`/api/v1/web/education/${id}`.convertURI(), {
    cache: 'no-cache',
  });

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default viewArticle;
