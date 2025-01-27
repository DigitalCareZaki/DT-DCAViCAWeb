import { create, test, enforce } from 'vest';

import type { TabletProps } from './types';
import type { MeasurementType } from '@types';

const validMeasurementTypes: MeasurementType[] = [
  'ECG',
  'SPO2',
  'BLOODPRESSURE',
  'BLOODGLUCOSE',
  'TEMPERATURE',
];

export const validator = create((data: TabletProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('serial_number', 'Serial is required', () => {
    enforce(data.title).isNotEmpty();
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
});
