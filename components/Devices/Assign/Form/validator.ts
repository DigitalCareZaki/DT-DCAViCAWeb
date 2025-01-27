import { create, test, enforce } from 'vest';

import type { AssignPatientDevice } from './types';

export const validator = create((data: AssignPatientDevice) => {
  test('device_id', 'Device is required', () => {
    enforce(data.device_id).isNotEmpty();
  });
});
