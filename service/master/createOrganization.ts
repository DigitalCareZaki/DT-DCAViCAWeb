'use server';

import fetch from '@fetch';

import type { CreateOrganizationProps } from '../types';

import '@init-globals';

async function createOrganization(data: any): Promise<CreateOrganizationProps> {
  try {
    const decodedData = await JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );
    const res = await fetch('/api/v1/web/master/organizations', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(decodedData),
    });

    const body = await res.json();

    if (res.status !== 201) {
      throw new Error(body?.message?.toString());
    }

    return {
      success: true,
      message: 'Organization created successfully',
    };
  } catch (err: any) {
    console.log('fetch failed');
    return {
      success: false,
      message: err?.message ?? 'Failed to create organization',
    };
  }
}

export default createOrganization;
