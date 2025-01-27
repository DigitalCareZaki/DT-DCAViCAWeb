import { create, test, enforce } from 'vest';

import type { CreateContactProps } from './types';

export const validator = create((data: CreateContactProps) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });

  test('name', 'Name is too short', () => {
    if (data.name && data.name.length < 3) {
      throw new Error('Name must be at least 3 characters long');
    }

    return true;
  });

  test('email', 'Email is required', () => {
    enforce(data.email).isNotEmpty();
  });

  test('email', 'Email is invalid', () => {
    enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('phone', 'Phone number is required', () => {
    enforce(data.phone).isNotEmpty();
  });

  test('phone', 'Invalid phone number', () => {
    const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
      throw new Error('Invalid phone number format');
    }

    return true;
  });

  test('relationship', 'Relationship is required', () => {
    enforce(data.relationship).isNotEmpty();
  });
});
