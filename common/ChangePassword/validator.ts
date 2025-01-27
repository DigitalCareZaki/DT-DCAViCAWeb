import { create, test, enforce, mode, Modes, only } from 'vest';

import type { Props } from './types';

export const validator = create((data: Props) => {
  mode(Modes.ALL);

  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
  });

  test('password', 'Password must be at least 8 characters long', () => {
    enforce(data.password).longerThanOrEquals(8);
  });

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

  only('repeatPassword'); // on all fields below

  test('repeatPassword', 'Repeat password is required', () => {
    enforce(data.repeatPassword).isNotEmpty();
  });

  test('repeatPassword', 'Repeat password must be same as new password', () => {
    enforce(data.repeatPassword).equals(data.password);
  });
});
