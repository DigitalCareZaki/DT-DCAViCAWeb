'use server';

import { PatientMeasurements } from '@common';
import { getUser } from '@actions';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Measurement: ServerComponentProps<Props> = async ({
  data,
  patient,
  type,
}) => {

  var user = await getUser();

  return (
    <PatientMeasurements
      data={data}
      patient={patient}
      user={user!}
      type={type}
      fullHeight={true}
    />
  );
};

export default Measurement;
