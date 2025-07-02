'use server';

import fetch from '@fetch';
import type { DetailArticleProps } from '../types';

async function viewArticle(id: string): Promise<DetailArticleProps> {
  const res = await fetch(`/api/v1/web/education/detail/${id}`, {
    cache: 'no-cache',
  });

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default viewArticle;
