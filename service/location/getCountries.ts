'use server';

import fetch from '@fetch';

import type { GetCountriesProps } from '../types';

const getCountries = async (): Promise<GetCountriesProps> => {
  const res = await fetch(
    '/api/v1/web/organization/location/countries'.convertURI()
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
};

export default getCountries;
