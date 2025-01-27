'use server';

import { PatientProfile } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const PatientProfileWrapper: ServerComponentProps<Props> = async ({
  patient,
}) => {
  return <PatientProfile patient={patient} />;
};

export default PatientProfileWrapper;
