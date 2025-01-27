'use server';

import { PatientNurses } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const NursesWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <PatientNurses patient={patient} />;
};

export default NursesWrapper;
