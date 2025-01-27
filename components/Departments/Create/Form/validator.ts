import { create, test, enforce } from 'vest';

import type { DepartmentProps } from './types';

export const validator = create((data: DepartmentProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('address', 'Address is missing', () => {
    enforce(data.address).isNotEmpty();
  });

  test('branch_id', 'Please select branch', () => {
    enforce(data.branch_id).isNotEmpty();
  });

  test('city', 'Please select city', () => {
    enforce(data.city).isNotEmpty();
  });
});
