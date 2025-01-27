import { create, test, enforce } from 'vest';

import type { TechnicalSupportProps } from './types';

export const validator = create((data: TechnicalSupportProps) => {
  test('forgot_password', 'Must be a boolean value', () => {
    enforce(data.forgot_password).isBoolean();
  });

  test('not_signing_up', 'Must be a boolean value', () => {
    enforce(data.not_signing_up).isBoolean();
  });

  test('can_not_find_anything', 'Must be a boolean value', () => {
    enforce(data.can_not_find_anything).isBoolean();
  });

  test('showing_errors', 'Must be a boolean value', () => {
    enforce(data.showing_errors).isBoolean();
  });

  test('others', 'Must be a boolean value', () => {
    enforce(data.others).isBoolean();
  });

  test('email', 'Can not be empty', () => {
    enforce(data.email).isNotEmpty();
  });

  test('email', 'Must be a valid email address', () => {
    enforce(data.email).matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  });
});
