

'use server';

import fetch from '@fetch';
import type { GetPatientsMeasurementsProps } from '../types';

async function getPatientsMeasurements(
  type: string,
  page?: any,
  pageSize?: any
): Promise<GetPatientsMeasurementsProps> {
  const queryParams = new URLSearchParams();

  if (type !== 'ALL') queryParams.set('type', type);
  if (!isNaN(page)) queryParams.set('page', page.toString());
  if (!isNaN(pageSize)) queryParams.set('pageSize', pageSize.toString());

  const url = `/api/v1/web/measurements${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const res = await fetch(url.convertURI());
  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientsMeasurements;



// 'use server';

// import fetch from '@fetch';

// import type { GetPatientsMeasurementsProps } from '../types';

// async function getPatientsMeasurements(
//   type: string
// ): Promise<GetPatientsMeasurementsProps> {
//   console.log(type, type);

//   const res = await fetch(
//     `/api/v1/web/measurements${type === 'ALL' ? '' : `?type=${type}`}`.convertURI()
//   );

//   const data = await res.json();

//   return {
//     success: res.ok,
//     data,
//   };
// }

// export default getPatientsMeasurements;
