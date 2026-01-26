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
        'flex w-auto min-w-[140px] cursor-pointer items-center justify-center rounded-full px-6 py-2 text-base font-bold transition-all duration-300 shadow-sm border hover:shadow-md hover:scale-105 whitespace-nowrap',
        isActive
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-emerald-200/50'
          : 'bg-white text-emerald-800 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50'
      )}
    >
      {title}
    </div >
  );
};

export default TimeSlot;
