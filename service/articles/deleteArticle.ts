'use server';

import fetch from '@fetch';
import type { ViewArticleProps } from '../types';

async function deleteArticle(id: string): Promise<ViewArticleProps> {
  const res = await fetch(`/api/v1/web/education/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default deleteArticle;
