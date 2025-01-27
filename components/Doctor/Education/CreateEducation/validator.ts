import { create, test, enforce } from 'vest';

import type { CreateArticleProps } from './types';

export const validator = create((data: CreateArticleProps) => {
  test('title', 'Article title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('title', 'Article title is too short', () => {
    if (data.title.length < 3) throw new Error();

    return true;
  });

  test('title', 'Article title is too long', () => {
    if (data.title.length > 100) throw new Error();

    return true;
  });

  test('content', 'Article content is required', () => {
    enforce(data.content).isNotEmpty();
  });

  test('content', 'Article content is too short', () => {
    if (data.content.length < 3) throw new Error();

    return true;
  });
});
