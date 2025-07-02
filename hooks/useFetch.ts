'use client';

import { useCallback, useState } from 'react';
import { getCookie } from 'cookies-next';

import type { useFetchReturnProps } from './types';

function useFetch<T>(): useFetchReturnProps {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>(null as any);
  const [error, setError] = useState(null);

  const handleFetch = useCallback(async (uri: string, method: string) => {
    try {
      setLoading(true);
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      headers.set('Authorization', getCookie('jwt')?.toString() ?? '');

      const data = await fetch(uri, {
        headers,
        method,
      });

      const res = await data.json();
      setData(res.data);
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return [handleFetch, loading, data, error];
}

export default useFetch;
