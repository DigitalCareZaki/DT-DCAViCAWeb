'use server';

import { PatientMeasurements } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

import { getUser } from '@actions';


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
      patient={patient}
      user={user!}
      type={type}
      hideActions={hideActions}
      leftPadding={leftPadding}
    />
  );
};

export default MeasurementsWrapper;
