'use server';

import fetch from '@fetch';

import type { GetSinglePatientECGData } from '@types-services';

async function getSingleVlPatient(
  patchSn: string
): Promise<GetSinglePatientECGData> {
  const res = await fetch(`/api/v1/vl/patients/${patchSn}`.convertURI(), {
    cache: 'no-store',
  });

  const data = await res.json();

  return {
    success: res.ok,
    data: data,
  };
}

export default getSingleVlPatient;
