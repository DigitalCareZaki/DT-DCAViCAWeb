'use server';

import { PatientTelemedicine } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const TelemedicineWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <PatientTelemedicine patient={patient} />;
};

export default TelemedicineWrapper;
