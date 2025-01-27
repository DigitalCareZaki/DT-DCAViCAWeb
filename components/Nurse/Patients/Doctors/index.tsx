'use server';

import { PatientDoctors } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const DoctorsWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <PatientDoctors patient={patient} />;
};

export default DoctorsWrapper;
