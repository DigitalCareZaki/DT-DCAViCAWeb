import { create, enforce, test } from 'vest';

import type { Props } from './types';

const allowedTitles = ['MR', 'MS', 'MRS', 'MISS', 'MASTER', 'MADAM'];

export const validator = create((data: Props) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('title', 'Invalid title value', () => {
    if (!allowedTitles.includes(data.title)) throw new Error();

    return true;
  });

  test('firstName', 'First name is required', () => {
    enforce(data.firstName).isNotEmpty();
  });

  test('address', 'Address is required', () => {
    enforce(data.address).isNotEmpty();
  });

  test('phoneNumber', 'Phone number is required', () => {
    enforce(data.phoneNumber).isNotEmpty();
  });

  test('phoneNumber', 'Invalid phone number', () => {
    const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    return true;
  });
});
