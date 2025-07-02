'use server';

import fetch from '@fetch';

import type { PatientReadingRange } from '@types';

import '@init-globals';

const createPatientReadingRange = async (
  data: any
): Promise<{
  success: boolean;
  data: PatientReadingRange;
}> => {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch(`/api/v1/web/measurements/ranges/create`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    const body = await res.json();

    return {
      success: res.ok,
      data: body,
    };
  } catch (err: any) {
    return {
      success: false,
      data: err?.message ?? 'Something went wrong',
    };
  }
};

export default createPatientReadingRange;
