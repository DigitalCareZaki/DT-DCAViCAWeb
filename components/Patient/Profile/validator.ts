import { create, test, enforce } from 'vest';

import { getInternationalPhoneNumberError } from '../../../utils/phoneNumber';
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

  test('phone_number', 'Invalid phone number', () => {
    const phoneError = getInternationalPhoneNumberError(data.phone_number);

    if (phoneError) {
      throw new Error(phoneError);
    }

    return true;
  });

  test('email', 'Email is invalid', () => {
    enforce(data.email).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('height', 'Height must be a number', () => {
    if (data.height && isNaN(data.height)) throw new Error();

    return true;
  });

  test('weight', 'Weight must be a number', () => {
    if (data.weight && isNaN(data.weight)) throw new Error();

    return true;
  });
});
