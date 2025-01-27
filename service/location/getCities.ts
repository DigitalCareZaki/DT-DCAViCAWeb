'use server';

import fetch from '@fetch';

import type { GetCitiesProps } from '../types';

const getCities = async (): Promise<GetCitiesProps> => {
  const res = await fetch(
    '/api/v1/web/organization/location/cities'.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getCities;
