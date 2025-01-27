'use server';

import fetch from '@fetch';

import type { GetSingleTabletProps } from '../types';

import '@init-globals';

const getSingleTablet = async (
  tabletId: string
): Promise<GetSingleTabletProps> => {
  const res = await fetch(`/api/v1/web/tablets/${tabletId}`.convertURI());

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getSingleTablet;
