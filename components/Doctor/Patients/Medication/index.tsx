'use server';

import { PatientMedication } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const MedicationWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <PatientMedication patient={patient} />;
};

export default MedicationWrapper;
