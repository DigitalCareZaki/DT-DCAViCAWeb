'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import type { ReduxProps } from '@store-types';

// Re-fetches the server-rendered dashboard (widgets + requested appointments)
// whenever the backend signals an appointment change, e.g. a new request.
const RefreshOnAppointmentUpdate = (): null => {
  const router = useRouter();
  const updates = useSelector<ReduxProps, number>(
    (state) => state.telemed.appointmentUpdates
  );
  const lastUpdates = useRef<number>(updates);

  useEffect(() => {
    if (updates === lastUpdates.current) return;

    lastUpdates.current = updates;
    router.refresh();
  }, [updates, router]);

  return null;
};

export default RefreshOnAppointmentUpdate;
