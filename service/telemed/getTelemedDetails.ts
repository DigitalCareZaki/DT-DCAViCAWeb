'use server';

import fetch from '@fetch';

import type { FetchTelemedDetails } from '../types';

import '@init-globals';

async function getTelemedDetailsProps(
  id: string
): Promise<FetchTelemedDetails> {
  const res = await fetch(`/api/v1/web/telemed/view/${id}`.convertURI());

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getTelemedDetailsProps;
