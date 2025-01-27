import { create, enforce, test } from 'vest';

import type { ValueProps } from './types';

export const validator = create((data: ValueProps) => {
  test('value', 'Username or email is required', () => {
    enforce(data.value).isNotEmpty();
  });

  test('value', 'Username or email is invalid', () => {
    if (data.value.length <= 3) throw new Error();

    return true;
  });
});
