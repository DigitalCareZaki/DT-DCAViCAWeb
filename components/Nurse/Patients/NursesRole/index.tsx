'use server';

import { NursesPatient } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const NursesRoleWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <NursesPatient patient={patient} />;
};

export default NursesRoleWrapper;
