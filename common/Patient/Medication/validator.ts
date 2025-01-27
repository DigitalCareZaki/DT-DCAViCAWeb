import { create, test, enforce } from 'vest';

import type { MedicationUnit } from '@types';
import type { CreateMedicationProps } from './types';

const validMedicationUnit: MedicationUnit[] = [
  'TABLET',
  'CAPSULE',
  'SOFTGEL',
  'TEASPOON',
  'TABLESPOON',
];

function validateDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function validateDatePattern(dateString: string): boolean {
  return dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
}

function validateTime(timeString: string): boolean {
  const [hours, minutes] = timeString.split(':').map(Number);
  return (
    !isNaN(hours) &&
    !isNaN(minutes) &&
    hours >= 0 &&
    hours < 24 &&
    minutes >= 0 &&
    minutes < 60
  );
}

function validateTimePattern(timeString: string): boolean {
  return timeString.match(/^\d{2}:\d{2}$/) !== null;
}

export const validator = create((data: CreateMedicationProps) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotEmpty();
  });

  test('start', 'Start is required', () => {
    enforce(data.start).isNotEmpty();
  });

  // validator js and vest error - issue created in the library
  // test('start', 'Start should be a valid date', () => {
  //   enforce(data.start).isDate({
  //     format: 'YYYY-MM-DD',
  //     strictMode: false,
  //     delimiters: ['-'],
  //   });
  // });

  test('start', 'Start should be YYYY-MM-DD', () => {
    return validateDatePattern(data.start);
  });

  test('start', 'Start should be a valid date', () => {
    return validateDate(data.start);
  });

  test('end', 'End is required', () => {
    enforce(data.end).isNotEmpty();
  });

  // validator js and vest error - issue created in the library
  // test('end', 'End should be a valid date', () => {
  //   enforce(data.end).isDate();
  // });

  test('end', 'End should be YYYY-MM-DD', () => {
    return validateDatePattern(data.end);
  });

  test('end', 'End should be a valid date', () => {
    return validateDate(data.end);
  });

  test('time', 'Time is required', () => {
    enforce(data.time).isNotEmpty();
  });

  // same for time, issue in vest/validator library

  test('time', 'Time should be HH:MM', () => {
    return validateTimePattern(data.time);
  });

  test('time', 'Time should be a valid time', () => {
    return validateTime(data.time);
  });

  test('dosage', 'Dosage is required', () => {
    enforce(data.dosage).isNotEmpty();
  });

  test('frequency', 'Frequency is required', () => {
    enforce(data.frequency).isNotEmpty();
  });

  test('frequency', 'Frequency should be a number', () => {
    enforce(data.frequency).isNumeric();
  });

  test('unit', 'Unit is required', () => {
    enforce(data.unit).isNotEmpty();
  });

  test('unit', `Unit must be ${validMedicationUnit.join(', or ')}`, () => {
    enforce(data.unit).inside(validMedicationUnit);
  });
});
