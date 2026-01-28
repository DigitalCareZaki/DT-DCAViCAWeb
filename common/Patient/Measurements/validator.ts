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

function getAcceptableUnitsBasedOnMeasurementType(
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

  test(
    'title',
    'Title is too long, must not be longer than 20 characters',
    () => {
      enforce(data.title).shorterThanOrEquals(20);
    }
  );

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

  test('value1', 'SPO2 must be between 0 and 100', () => {
    if (data.type === 'SPO2' && data.value1) {
      const val = parseFloat(data.value1);
      return !isNaN(val) && val >= 0 && val <= 100;
    }
    return true;
  });

  test('value1', 'Systolic must be between 40 and 300', () => {
    if (data.type === 'BLOODPRESSURE' && data.value1) {
      const val = parseFloat(data.value1);
      return !isNaN(val) && val >= 40 && val <= 300;
    }
    return true;
  });

  test('value1', 'Blood Glucose must be between 10 and 1000', () => {
    if (data.type === 'BLOODGLUCOSE' && data.value1) {
      const val = parseFloat(data.value1);
      return !isNaN(val) && val >= 10 && val <= 1000;
    }
    return true;
  });

  test('value1', 'Temperature must be between 90 and 110', () => {
    if (data.type === 'TEMPERATURE' && data.value1) {
      const val = parseFloat(data.value1);
      return !isNaN(val) && val >= 90 && val <= 110;
    }
    return true;
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

  test('value2', 'Diastolic must be between 20 and 200', () => {
    if (data.type === 'BLOODPRESSURE' && data.value2) {
      const val = parseFloat(data.value2);
      return !isNaN(val) && val >= 20 && val <= 200;
    }
    return true;
  });
});
