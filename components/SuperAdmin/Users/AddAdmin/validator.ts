import { create, test, enforce, mode, Modes, only } from 'vest';

import type { AddAdminProps } from './types';

const MIN_NAME_LENGTH = 3;

export const validator = create((data: AddAdminProps) => {
  mode(Modes.ALL);
  test('firstName', 'First name is required', () => {
    enforce(data.firstName).isNotEmpty();
  });

  test(
    'firstName',
    `First name must be longer than or equal to ${MIN_NAME_LENGTH} characters`,
    () => {
      if (data.firstName?.trim()?.length) {
        enforce(data.firstName.trim()).longerThanOrEquals(MIN_NAME_LENGTH);
      }
    }
  );

  test('middleName', 'Middle name is required', () => {
    enforce(data.middleName).isNotEmpty();
  });

  test(
    'middleName',
    `Middle name must be longer than or equal to ${MIN_NAME_LENGTH} characters`,
    () => {
      if (data.middleName?.trim()?.length) {
        enforce(data.middleName.trim()).longerThanOrEquals(MIN_NAME_LENGTH);
      }
    }
  );

  test('lastName', 'Last name is required', () => {
    enforce(data.lastName).isNotEmpty();
  });

  test(
    'lastName',
    `Last name must be longer than or equal to ${MIN_NAME_LENGTH} characters`,
    () => {
      if (data.lastName?.trim()?.length) {
        enforce(data.lastName.trim()).longerThanOrEquals(MIN_NAME_LENGTH);
      }
    }
  );

  test('phoneNumber', 'Phone number is required', () => {
    enforce(data.phoneNumber).isNotEmpty();
  });

  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
  });

  test(
    'password',
    'Password must be at least 8 characters long. It must contain a mix of uppercase, lowercase letters, numbers, and special characters (@$!%*?&).',
    () => {
      enforce(data.password).longerThanOrEquals(8);
    }
  );

  test(
    'password',
    'Password must contain at least one uppercase letter',
    () => {
      enforce(data.password).matches(/[A-Z]/);
    }
  );

  test(
    'password',
    'Password must contain at least one lowercase letter',
    () => {
      enforce(data.password).matches(/[a-z]/);
    }
  );

  test(
    'password',
    'Password must contain at least one special character',
    () => {
      enforce(data.password).matches(/[*.,!@#$%^&(){}\[\]:;<>\?\/\\~_+\-=|\]]/);
    }
  );

  test('password', 'Password must contain at least one numeric digit', () => {
    enforce(data.password).matches(/\d/);
  });

  test('password', 'Password must not contain any spaces', () => {
    enforce(data.password).notMatches(/\s/);
  });

  test('username', 'Username is required', () => {
    enforce(data.username).isNotEmpty();
  });

  test('email', 'Email is required', () => {
    enforce(data.email).isNotEmpty();
  });

  test('gender', 'Gender is required', () => {
    enforce(data.gender).isNotEmpty();
  });

  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('country', 'Country is required', () => {
    enforce(data.country).isNotEmpty();
  });

  test('city', 'City is required', () => {
    enforce(data.city).isNotEmpty();
  });

  test('branch', 'Branch is required', () => {
    enforce(data.branch).isNotEmpty();
  });

  test('dob', 'Date of birth is required', () => {
    enforce(data.dob).isNotEmpty();
  });

  test('phoneNumber', 'Invalid phone number', () => {
    const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    return true;
  });

  test('email', 'Email is invalid', () => {
    enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('password', 'Password is too short', () => {
    if (data.password.length < 8) throw new Error('Password is too short');

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

  test('username', 'Username should not contain spaces', () => {
    if (data.username.includes(' ')) throw new Error('');

    return true;
  });

  test('username', 'Username is too short', () => {
    if (data.username.length < 3) throw new Error('');

    return true;
  });
});
