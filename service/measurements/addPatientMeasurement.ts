'use server';

import fetch from '@fetch';

async function addPatientMeasurement(data: any, patientId: string) {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch(
      `/api/v1/web/measurements/patients/${patientId}`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
          ...decodedData,
        }),
      }
    );

    const body = await res.json();

    if (res.status !== 201) {
      throw new Error(body?.message);
    }

    return {
      success: true,
      ...body,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message ?? 'Something went wrong',
    };
  }
}

export default addPatientMeasurement;
