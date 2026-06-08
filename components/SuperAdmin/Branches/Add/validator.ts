import { create, test, enforce } from 'vest';

import type { AddBranchProps } from './types';

const validator = create((data: AddBranchProps) => {
  test('name', 'Branch name is required', () => {
    enforce(data.name).isNotEmpty();
  });

  test('name', 'Branch name is too short', () => {
    enforce(data.name).longerThan(1);
  });

  test('name', 'Branch name is too long', () => {
    if (data.name.length > 50) throw new Error();

    return true;
  });

  test('address', 'Branch address is required', () => {
    enforce(data.address).isNotEmpty();
  });

  test('address', 'Branch address is too short', () => {
    enforce(data.address).longerThan(1);
  });

  test('city', 'Branch city is required', () => {
    enforce(data.city).isNotEmpty();
  });

  test('country', 'Branch country is required', () => {
    enforce(data.country).isNotEmpty();
  });

  test('email', 'Invalid branch email', () => {
    if (!data.email.length) return true;

    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailRegex.test(data.email)) {
      throw new Error();
    }

    // if (data.email.length > 25) throw new Error();

    return true;
  });

  test('phoneNumber', 'Invalid phone number', () => {
    if (!data.phoneNumber) return true;

    const phoneRegex = /^\+[0-9]{1,3}[0-9]{10}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      throw new Error();
    }

    return true;
  });
});

export default validator;
