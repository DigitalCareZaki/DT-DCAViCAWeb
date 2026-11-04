'use server';

import fetch from '@fetch';
import type { GetPatientProtocolsResponse } from '@types-services';

type ProtocolRecord = {
  id?: string;
  _id?: string;
  name?: string;
};

async function getPatientProtocols(): Promise<GetPatientProtocolsResponse> {
  const res = await fetch('/api/v1/web/patient/protocols', {
    cache: 'no-store',
  });
  const body = await res.json();
  const protocols: ProtocolRecord[] | undefined = Array.isArray(body)
    ? body
    : Array.isArray(body?.data)
      ? body.data
      : Array.isArray(body?.data?.data)
        ? body.data.data
        : undefined;

  if (!res.ok || !protocols) {
    return { success: false, data: [] };
  }

  return {
    success: true,
    data: protocols.flatMap((protocol) => {
      const id = protocol?.id || protocol?._id;
      return typeof id === 'string' && typeof protocol?.name === 'string'
        ? [{ id, name: protocol.name }]
        : [];
    }),
  };
}

export default getPatientProtocols;
