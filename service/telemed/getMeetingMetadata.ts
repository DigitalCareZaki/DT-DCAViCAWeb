import fetch from '@fetch';

import type { FetchMeetingMetaData } from '../types';

import '@init-globals';

async function fetchMeetingMetaData(id: string): Promise<FetchMeetingMetaData> {
  const res = await fetch(
    `/api/v1/web/telemed/meeting-metadata/${id}`.convertURI()
  );

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default fetchMeetingMetaData;
