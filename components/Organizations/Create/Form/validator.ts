import { create, enforce, test } from 'vest';

import { FormValuesProps } from './types';

export const validator = create((data: FormValuesProps) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });

  test('email', 'Email is required', () => {
    enforce(data.email).isNotEmpty();
  });

  test('phone_number', 'Phone number is required', () => {
    enforce(data.phone_number).isNotEmpty();
  });

  test('city_id', 'City is required', () => {
    enforce(data.city_id).isNotEmpty();
  });

  test('address', 'Address is required', () => {
    enforce(data.address).isNotEmpty();
  });
});
