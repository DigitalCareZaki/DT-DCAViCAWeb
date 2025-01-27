'use server';

import { PatientMeasurements } from '@common';

import type { ServerComponentProps } from '@types';
import { getUser } from '@actions';
import type { Props } from './types';

const MeasurementsWrapper: ServerComponentProps<Props> = async ({
  data,
  patient,
  type,
  hideActions,
  leftPadding,
}) => {
  var user = await getUser();
  return (
    <PatientMeasurements
      data={data}
      user={user!}
      patient={patient}
      type={type}
      hideActions={hideActions}
      leftPadding={leftPadding}
    />
  );
};

export default MeasurementsWrapper;
