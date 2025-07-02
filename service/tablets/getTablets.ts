'use server';

import fetch from '@fetch';

import type { GetTabletProps } from '../types';

import '@init-globals';

const getTablets = async (): Promise<GetTabletProps> => {
  const res = await fetch('/api/v1/web/tablets');

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getTablets;
