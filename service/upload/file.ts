'use server';

import fetch from '@fetch';

import '@init-globals';

async function uploadFile(data: FormData): Promise<{
  url: string | undefined;
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch(
      `/api/v1/web/uploader`,
      {
        method: 'POST',
        body: data,
      },
      true
    );

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body?.message);
    }

    return {
      success: true,
      ...body,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
      url: undefined,
    };
  }
}

export default uploadFile;
