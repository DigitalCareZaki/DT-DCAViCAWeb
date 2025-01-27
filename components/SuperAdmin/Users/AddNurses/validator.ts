import { create, test, enforce } from 'vest';

import type { AddNurseProps } from './types';

export const validator = create((data: AddNurseProps) => {
  test('firstName', 'First name is required', () => {
    enforce(data.firstName).isNotEmpty();
  });

  test('lastName', 'Last name is required', () => {
    enforce(data.lastName).isNotEmpty();
  });

  test('phoneNumber', 'Phone number is required', () => {
    enforce(data.phoneNumber).isNotEmpty();
  });

  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
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

  test('department', 'Department is required', () => {
    enforce(data.department).isNotEmpty();
  });

  test('dob', 'Date of birth is required', () => {
    enforce(data.dob).isNotEmpty();
  });

  test('npi_number', 'NPI number is required', () => {
    enforce(data.npi_number).isNotEmpty();
  });

  test('employee_id', 'Employee ID is required', () => {
    enforce(data.employee_id).isNotEmpty();
  });

  test('firstName', 'First name is too short', () => {
    if (data.firstName.length < 3) throw new Error('First name is too short');

    return true;
  });

  test('firstName', 'First name is too long', () => {
    if (data.firstName.length >= 15) throw new Error('First name is too long');

    return true;
  });

  test('middleName', 'Middle name is too short', () => {
    if (!data.middleName.length) return true;
    if (data.middleName.length < 3) throw new Error('Middle name is too short');

    return true;
  });

  test('middlenName', 'Middle name is too long', () => {
    if (data.middleName.length >= 15)
      throw new Error('Middle name is too long');

    return true;
  });

  test('lastName', 'Last name is too short', () => {
    if (data.lastName.length < 3) throw new Error('Last name is too short');

    return true;
  });

  test('lastName', 'Last name is too long', () => {
    if (data.lastName.length >= 15) throw new Error('Last name is too long');

    return true;
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
