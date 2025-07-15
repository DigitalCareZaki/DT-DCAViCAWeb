'use client';

import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import type { TimeSlotProps } from '../types';
import type { ClientComponentProps } from '@types';

const TimeSlot: ClientComponentProps<TimeSlotProps> = ({
  title,
  startTime,
  endTime,
  onSelect,
  selectedTimeSlot,
}) => {
  const isActive = useMemo(
    () =>
      new Date(startTime as any).getTime() ===
      new Date(selectedTimeSlot?.startTime as any).getTime() &&
      new Date(endTime as any).getTime() ===
      new Date(selectedTimeSlot?.endTime as any).getTime(),
    [startTime, endTime, selectedTimeSlot]
  );

  const handleSelect = () => {
    onSelect?.call(this, startTime as any, endTime as any);
  };

  return (
    <div
      onClick={handleSelect}
      className={twMerge(
        'flex h-11 w-40 cursor-pointer items-center justify-center rounded-lg text-xs font-semibold transition duration-200 hover:bg-emerald-500 hover:text-emerald-900',
        isActive ? '!bg-emerald-500 text-white' : '!bg-emerald-100 text-emerald-900'
      )}
    >
      {title}
    </div>
  );
};

export default TimeSlot;
