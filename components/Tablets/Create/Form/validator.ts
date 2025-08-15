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

export const validator = create((data: TabletProps, fieldName, ctx?: { role?: string }) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('serial_number', 'Serial is required', () => {
    enforce(data.title).isNotEmpty();
  });

  // test('category', 'Category is required', () => {
  //   enforce(data.category = "").isNotEmpty();
  // });

  // console.log("ctx?.role?.toLowerCase()", ctx?.role?.toLowerCase());

  // // If role is admin, skip category type check
  // if (ctx?.role?.toLowerCase() === 'admin') {
  //   test(
  //     'category',
  //     () => {
  //       enforce(data.category).inside("ECG");
  //     }
  //   );
  // }
});
