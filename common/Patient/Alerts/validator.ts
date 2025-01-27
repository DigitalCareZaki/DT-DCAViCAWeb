import { create, test, enforce } from 'vest';

import type { CreatePatientReadingAlertProps } from './types';
import type { MeasurementType } from '@types';

const validMeasurementTypes: MeasurementType[] = [
  'SPO2',
  'BLOODPRESSURE',
  'BLOODGLUCOSE',
  'TEMPERATURE',
];

export const validator = create((data: CreatePatientReadingAlertProps) => {
  test('type', 'Type is required', () => {
    enforce(data.type).isNotEmpty();
  });

  test('type', `Type must be ${validMeasurementTypes.join(', or ')}`, () => {
    enforce(data.type).inside(validMeasurementTypes);
  });

  test('range_low_1', 'Value is required', () => {
    enforce(data.range_low_1).isNotEmpty();
  });

  test('range_low_1', 'Value must be a number', () => {
    enforce(data.range_low_1).isNumeric();
  });

  test('range_high_1', 'Value is required', () => {
    enforce(data.range_high_1).isNotEmpty();
  });

  test('range_high_1', 'Value must be a number', () => {
    enforce(data.range_high_1).isNumeric();
  });

  if (data.type === 'BLOODPRESSURE') {
    test('range_low_2', 'Value must be a number', () => {
      enforce(data.range_low_2).isNumeric();
    });

    test('range_high_2', 'Value must be a number', () => {
      enforce(data.range_high_2).isNumeric();
    });
  }
});
