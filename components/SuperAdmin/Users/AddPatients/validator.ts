import { create, test, enforce } from 'vest';

import { getInternationalPhoneNumberError } from '../../../../utils/phoneNumber';
import type { AddPatientProps } from './types';

export const validator = create((data: AddPatientProps) => {
  test('firstName', 'First name is required', () => {
    enforce(data.firstName).isNotEmpty();
  });

  test('middleName', 'Middle name is required', () => {
    enforce(data.middleName).isNotEmpty();
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

  test('weight', 'Weight is required', () => {
    enforce(data.weight).isNotEmpty();
  });

  test('height', 'Height is required', () => {
    enforce(data.height).isNotEmpty();
  });

  test('dob', 'Date of birth is required', () => {
    enforce(data.dob).isNotEmpty();
  });

  test('address', 'Address is required', () => {
    enforce(data.address).isNotEmpty();
  });

  test('cardiac_monitoring', 'AViCardia Monitoring is required', () => {
    enforce(data.cardiac_monitoring).isNotEmpty();
  });

  test('site', 'Cardiac Monitoring Site is required', () => {
    enforce(data.site).isNotEmpty();
  });

  test('doctor', 'Doctor is required', () => {
    enforce(data.doctor).isNotEmpty();
  });

  test('nurse', 'Nurse is required', () => {
    enforce(data.nurse).isNotEmpty();
  });

  test('phoneNumber', 'Invalid phone number', () => {
    const phoneError = getInternationalPhoneNumberError(data.phoneNumber);

    if (phoneError) {
      throw new Error(phoneError);
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
