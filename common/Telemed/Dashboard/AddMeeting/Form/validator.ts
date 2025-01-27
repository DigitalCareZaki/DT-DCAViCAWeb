import { create, test, enforce } from 'vest';

import type { AddAppointmentProps } from './types';

export const validator = create((data: AddAppointmentProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('description', 'Description is required', () => {
    enforce(data.description).isNotEmpty();
  });

  test('type', 'Type is required', () => {
    enforce(data.type).isNotEmpty();
  });

  test('about', 'About is required', () => {
    enforce(data.about).isNotEmpty();
  });
});
