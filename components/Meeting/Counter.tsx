'use client';

import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { MdTimelapse } from '@react-icons/all-files/md/MdTimelapse';

import type { ClientComponentProps } from '@types';
import type { CounterProps } from './types';
import { MAX_MEETING_MS, MEETING_WARNING_MS } from './constants';

// Counts down the time left in the call. The full time is shown until the
// other side joins and the clock starts.
const Counter: ClientComponentProps<CounterProps> = ({ startedAt, ended }) => {
  const [now, setNow] = useState<number>(() => Date.now());

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (startedAt === null || ended) return;

    setNow(Date.now());
    const intervalId = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(intervalId);
  }, [startedAt, ended]);

  const remaining = ended
    ? 0
    : startedAt === null
      ? MAX_MEETING_MS
      : Math.min(MAX_MEETING_MS, Math.max(0, startedAt + MAX_MEETING_MS - now));

  return (
    <div
      title="Time remaining"
      className={twMerge(
        'flex h-8 w-[85px] items-center justify-between gap-1 rounded-full px-2 text-ssx text-white',
        remaining <= MEETING_WARNING_MS ? 'bg-rose-500' : 'theme-bg-color'
      )}
    >
      <MdTimelapse size={18} />

      {formatTime(remaining)}
    </div>
  );
};

export default Counter;
