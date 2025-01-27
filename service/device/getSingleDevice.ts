'use server';

import fetch from '@fetch';

import type { GetSingleDeviceProps } from '../types';

import '@init-globals';

const getSingleDevice = async (
  deviceId: string
): Promise<GetSingleDeviceProps> => {
  const res = await fetch(`/api/v1/web/devices/${deviceId}`.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getSingleDevice;
