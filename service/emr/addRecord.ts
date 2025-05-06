'use server';

import fetch from '@fetch';

import type { AddPatientEMRRecord } from '../types';

import '@init-globals';

async function addRecord(data: any): Promise<any> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );

    const res = await fetch('/api/v1/web/emr'.convertURI(), {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    if (res.status !== 201) {
      throw new Error('Failed to add record');
    }

    return {
      success: true,
      records: await res.json(),

    };
  } catch (err) {
    return {
      success: false,
    };
  }
}

export default addRecord;
