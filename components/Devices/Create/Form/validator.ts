import { create, test, enforce } from 'vest';

import type { DeviceProps } from './types';
import type { MeasurementType } from '@types';

const validMeasurementTypes: MeasurementType[] = [
  'ECG',
  'SPO2',
  'BLOODPRESSURE',
  'BLOODGLUCOSE',
  'TEMPERATURE',
];

export const validator = create((data: DeviceProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('description', 'Description is required', () => {
    enforce(data.description).isNotEmpty();
  });

  test('serial_number', 'Serial is required', () => {
    enforce(data.serial_number).isNotEmpty();
  });

  test('category', 'Category is required', () => {
    enforce(data.category).isNotEmpty();
  });

  test(
    'category',
    `Category must be ${validMeasurementTypes.join(', or ')}`,
    () => {
      enforce(data.category).inside(validMeasurementTypes);
    }
  );

  test('cardiac_monitoring', 'Cardiac monitoring option is required', () => {
    enforce(data.cardiac_monitoring).isNotEmpty();
  });

  test('cardiac_monitoring', 'Invalid cardiac monitoring option', () => {
    enforce(data.cardiac_monitoring).inside(['YES', 'NO', 'LATER']);
  });

  test(
    'cardiac_monitoring',
    'AViCardia Monitoring is only available for ECG devices',
    () => {
      if (data.category && data.category !== 'ECG') {
        enforce(data.cardiac_monitoring).equals('NO');
      }
    }
  );

  test('site_id', 'Site is required', () => {
    enforce(data.site_id).isNotEmpty();
  });
});
