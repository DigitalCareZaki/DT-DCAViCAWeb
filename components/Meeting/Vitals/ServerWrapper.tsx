'use server';

import Vitals from './index';

import { getLatestPatientMeasurement } from '@service';

import type { ServerComponentProps } from '@types';
import type { ServerWrapperProps } from './types';

const VitalsServerWrapper: ServerComponentProps<ServerWrapperProps> = async ({
  id,
}) => {
  const res = await getLatestPatientMeasurement(id);

  return <Vitals data={res.data} />;
};

export default VitalsServerWrapper;
