import { create, test, enforce } from 'vest';

import type { PatientProps } from './types';

export const validator = create((data: PatientProps) => {
  test('first_name', 'First name is required', () => {
    enforce(data.first_name).isNotEmpty();
  });

  test('last_name', 'Last name is required', () => {
    enforce(data.last_name);
  });

  test('phone_number', 'Phone number is required', () => {
    enforce(data.phone_number).isNotEmpty();
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

  test('first_name', 'First name is too short', () => {
    if (data.first_name.length < 3) throw new Error('First name is too short');

    return true;
  });

  test('first_name', 'First name is too long', () => {
    if (data.first_name.length >= 15) throw new Error('First name is too long');

    return true;
  });

  test('last_name', 'Last name is too short', () => {
    if (data.last_name.length < 3) throw new Error('Last name is too short');

    return true;
  });

  test('last_name', 'Last name is too long', () => {
    if (data.last_name.length >= 15) throw new Error('Last name is too long');

    return true;
  });

  test('phone_number', 'Invalid phone number', () => {
    const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
    if (!phoneRegex.test(data.phone_number)) {
      throw new Error('Invalid phone number format');
    }

    return true;
  });

  test('email', 'Email is invalid', () => {
    enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('heigt', 'Height must be a number', () => {
    if (data.height && isNaN(data.height)) throw new Error();

    return true;
  });

  test('weight', 'Weight must be a number', () => {
    if (data.weight && isNaN(data.weight)) throw new Error();

    return true;
  });
});
