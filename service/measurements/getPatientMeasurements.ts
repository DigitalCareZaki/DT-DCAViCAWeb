'use server';

import fetch from '@fetch';

import type { GetPatientsMeasurementsProps } from '../types';
const queryParams = new URLSearchParams();
async function getPatientsMeasurements(
  id: string,
  type: string,
  page: number,
  pageSize: number
): Promise<GetPatientsMeasurementsProps> {
  if (type !== 'ALL') queryParams.append('type', type);
  // Append parameters only once
  if (type !== 'ALL') queryParams.set('type', type);
  if (typeof page === 'number' && !isNaN(page))
    queryParams.set('page', page.toString());
  if (typeof pageSize === 'number' && !isNaN(pageSize))
    queryParams.set('pageSize', pageSize.toString());

  // Construct the final URL
  const url = `/api/v1/web/measurements/patients/${id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const res = await fetch(url.convertURI());
  console.log(res, '==========>>>res Sameer');
  // const res = await fetch(
  //   `/api/v1/web/measurements/patients/${id}${type === 'ALL' ? '' : `?type=${type}`}`.convertURI()
  // );

  const data = await res.json();
  return {
    success: res.ok,
    data,
  };
}

export default getPatientsMeasurements;
