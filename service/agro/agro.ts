'use server';

import fetch from '@fetch';

async function createTheToken(data: any): Promise<any> {
  try {
    // const decodedData = await JSON.parse(
    //   Buffer.from(data, 'base64').toString('utf-8')
    // );

    const res = await fetch('/api/v1/agora/token', {
      method: 'POST',
      // body: JSON.stringify(decodedData),
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (res.status !== 201) {
      throw new Error(body?.message?.toString() || 'Something went wrong');
    }

    return { success: true, token: body.agoraToken, numericUid: body.numericUid };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
    };
  }
}

export default createTheToken;
