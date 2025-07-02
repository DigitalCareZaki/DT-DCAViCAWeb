'use server';

import fetch from '@fetch';

import type { GetDeviceProps } from '../types';

import '@init-globals';

const getAllDevicesForPatient = async (
  patientId: string
): Promise<GetDeviceProps> => {
  const res = await fetch(
    `/api/v1/web/devices/patients/${patientId}`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getAllDevicesForPatient;
