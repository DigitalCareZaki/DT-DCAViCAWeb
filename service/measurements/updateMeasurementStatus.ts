'use server';

import fetch from '@fetch';

async function updateMeasurementStatus(
  id: string,
  new_status: number,
  username: String,
): Promise<boolean> {


  const res = await fetch(
    `/api/v1/web/measurements/${id}?status=${new_status}&updated_by='${username}'`,
    {
      method: 'POST',
    }
  );
  return res.ok;
}

export default updateMeasurementStatus;