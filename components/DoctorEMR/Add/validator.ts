import { create, test, enforce } from 'vest';

import type { AddEMRRecordProps } from './types';

export const validator = create((data: AddEMRRecordProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('title', 'Title is too short', () => {
    if (data.title.length < 3) throw new Error();

    return true;
  });

  test('title', 'Title is too long', () => {
    if (data.title.length > 100) throw new Error();

    return true;
  });
});
