'use server';

import { PatientAlerts } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const AlertsWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <PatientAlerts patient={patient} />;
};

export default AlertsWrapper;
