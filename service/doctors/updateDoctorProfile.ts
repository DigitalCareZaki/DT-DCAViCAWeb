'use server';

import fetch from '@fetch';

import '@init-globals';

async function updateDoctorProfile(
  data: any,
  type: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch(`/api/v1/web/${type}/profile`, {
      method: 'PATCH',
      cache: 'no-cache',
      body: JSON.stringify({
        ...decodedData,
      }),
    });

    const body = await res.json();

    console.log('body >>>>>', body);

    if (res.status !== 200) {
      throw new Error(body?.message);
    }

    return {
      success: res.ok,
      ...body,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
    };
  }
}

export default updateDoctorProfile;
