'use server';

import fetch from '@fetch';

import type { GetDeviceProps } from '../types';

import '@init-globals';

const getDevices = async (): Promise<GetDeviceProps> => {
  const res = await fetch('/api/v1/web/devices');

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getDevices;
