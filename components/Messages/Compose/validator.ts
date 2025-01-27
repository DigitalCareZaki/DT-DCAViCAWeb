import { create, enforce, test } from 'vest';

import type { MessageComposeProps } from './types';

export const validator = create((data: MessageComposeProps) => {
  test('send_to', 'To is required', () => {
    enforce(data.send_to).isNotEmpty();
  });

  test('send_to', 'Invalid email', () => {
    enforce(data.send_to).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('subject', 'Subject is required', () => {
    enforce(data.subject).isNotEmpty();
  });

  test('subject', 'Subject is too large', () => {
    if (data.subject.length > 100) throw new Error();

    return true;
  });
});
