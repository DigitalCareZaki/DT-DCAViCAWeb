import { create, test, enforce } from 'vest';

import type { MeasurementType, MeasurementUnit } from '@types';
import type { CreateMeasurementProps } from './types';

const validMeasurementTypes: MeasurementType[] = [
  'ECG',
  'SPO2',
  'BLOODPRESSURE',
  'BLOODGLUCOSE',
  'TEMPERATURE',
];
const validMeasurementUnit: MeasurementUnit[] = [
  'VOLTAGE',
  'PERCENTAGE',
  'MMHG',
  'MGDL',
  'FAHRENHEIT',
];

export function getAcceptableUnitsBasedOnMeasurementType(
  type: MeasurementType
): MeasurementUnit[] {
  if (type === 'ECG') {
    return ['VOLTAGE'];
  } else if (type === 'SPO2') {
    return ['PERCENTAGE'];
  } else if (type === 'BLOODPRESSURE') {
    return ['MMHG'];
  } else if (type === 'BLOODGLUCOSE') {
    return ['MGDL'];
  } else if (type === 'TEMPERATURE') {
    return ['FAHRENHEIT'];
  } else {
    return [];
  }
}

export const validator = create((data: CreateMeasurementProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('type', 'Type is required', () => {
    enforce(data.type).isNotEmpty();
  });

  test('type', `Type must be ${validMeasurementTypes.join(', or ')}`, () => {
    enforce(data.type).inside(validMeasurementTypes);
  });

  test('unit', 'Unit is required', () => {
    enforce(data.unit).isNotEmpty();
  });

  test('unit', `Unit must be ${validMeasurementUnit.join(', or ')}`, () => {
    enforce(data.unit).inside(validMeasurementUnit);
  });

  test(
    'unit',
    `Unit must be ${getAcceptableUnitsBasedOnMeasurementType(data.type).join(', or ')}`,
    () => {
      const acceptableUnits = getAcceptableUnitsBasedOnMeasurementType(
        data.type
      );

      return acceptableUnits.length > 0
        ? acceptableUnits.some((val) => val === data.unit)
        : true;
    }
  );

  test('value1', 'Value is required', () => {
    enforce(data.value1).isNotEmpty();
  });

  test('value1', 'Value must be a number', () => {
    enforce(data.value1).isNumeric();
  });

  test('value2', 'Value is required', () => {
    if (data.type === 'BLOODPRESSURE') {
      return !!data.value2;
    }
    return true;
  });

  test('value2', 'Value must be a number', () => {
    if (data.type === 'BLOODPRESSURE' && data.value2) {
      return !isNaN(parseFloat(data.value2));
    }
    return true;
  });
});
