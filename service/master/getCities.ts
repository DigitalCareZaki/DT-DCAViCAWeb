'use server';

import fetch from '@fetch';

import type { GetCitiesProps } from '../types';

import '@init-globals';

async function getCities(): Promise<GetCitiesProps> {
  const res = await fetch('/api/v1/web/master/cities');

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getCities;
