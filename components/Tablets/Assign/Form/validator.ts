import { create, test, enforce } from 'vest';

import type { AssignPatientTablet } from './types';

export const validator = create((data: AssignPatientTablet) => {
  test('tablet_id', 'Tablet is required', () => {
    enforce(data.tablet_id).isNotEmpty();
  });
});
