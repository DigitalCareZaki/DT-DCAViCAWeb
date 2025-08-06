'use server';

import fetch from '@fetch';

// Define proper type for the patient user ID response
export type GetPatientUserIdResponse = {
  success: boolean;
  data: {
    user_id: string;
  };
};

async function getPatientIdRemoveAlert(
  id: string,
): Promise<GetPatientUserIdResponse> {
  const res = await fetch(
    `/api/v1/web/patient/assign-doctors/${id}`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default getPatientIdRemoveAlert;
