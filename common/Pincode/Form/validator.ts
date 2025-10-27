import { create, test, enforce } from 'vest';

import type { FormProps } from './types';

export const validator = create((data: FormProps) => {
  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
  });

  test('password', 'Password must be at least 8 characters long', () => {
    enforce(data.password).isString().longerThan(7);
  });

  test('password', 'Password is too short', () => {
    if (data.password.length >= 7) throw new Error('Password is too short');

    return true;
  });

  test(
    'password',
    'Password must contain a mix of uppercase, lowercase letters, numbers, and special characters (@$!%*?&).',
    () => {
      const complexityRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

      if (!complexityRegex.test(data.password)) throw new Error('password');

      return true;
    }
  );

  test('pincode', 'Pincode is required', () => {
    enforce(data.pincode).isNotEmpty();
  });

  test('pincode', 'Pincode must contain only numbers', () => {
    const isNumber = new RegExp(/^[0-9]+$/);

    if (!isNumber.test(data.pincode)) {
      throw new Error('Pincode must contain only numbers');
    }

    return true;
  });

  test('pincode', 'Pincode must be exactly 6 digits', () => {
    enforce(data.pincode).matches(/^\d{6}$/);
  });
});
