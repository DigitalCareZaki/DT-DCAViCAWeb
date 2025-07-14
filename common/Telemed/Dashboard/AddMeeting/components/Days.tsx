'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

import { generateDates } from '@init-globals';
import { ClientGenerator } from '@common';

import type { ClientComponentProps } from '@types';
import type { DaysProps } from '../types';
import { twMerge } from 'tailwind-merge';
import type { GeneratorProps } from '../../../../../common/Generator/types';

const Days: ClientComponentProps<DaysProps> = ({ onSelect, selected, startDate, endDate }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    var data = generateDatesNew(startDate, endDate);
    setTestS({
      data: data.map((el) => ({ value: el })),
    });
    setDays(data);
  }, [startDate, endDate]);

  const handleScroll = (direction: 'left' | 'right') => () => {
    if (!scrollRef.current) return;

    const scrollAmount = 200;
    const newScrollValue =
      direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

    scrollRef.current.scrollTo({
      left: newScrollValue,
      behavior: 'smooth',
    });
  };

  const [testS, setTestS] = useState<GeneratorProps>({});


  return (
    <div className="relative flex w-[60%] items-center justify-center">
      <div
        onClick={handleScroll('left')}
        className="absolute -left-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fuchsia-100 text-gray-500 transition duration-300 hover:scale-105 hover:bg-fuchsia-500 hover:text-white"
      >
        <IoIosArrowBack />
      </div>
      <div
        onClick={handleScroll('right')}
        className="absolute -right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fuchsia-100 transition duration-300 hover:scale-105 hover:bg-fuchsia-500 hover:text-white"
      >
        <IoIosArrowBack className=" rotate-180" />
      </div>

      <div
        ref={scrollRef}
        className="hidescrollbar relative flex w-[90%] gap-4 overflow-y-hidden overflow-x-scroll rounded-full p-2"
      >
        {
          days.map((el) => (
            <Day
              value={el}
              onSelect={onSelect}
              selected={selected}
            />
          ))
        }
      </div>
    </div>
  );
};

const Day: ClientComponentProps<DayProps> = ({ value, onSelect, selected }) => {
  const isActive: boolean = useMemo(
    () =>
      new Date(value as any).getTime() === new Date(selected as any).getTime(),
    [value, selected]
  );

  const handleSelect = () => {
    onSelect?.call(this, value);
  };

  return (
    <div
      onClick={handleSelect}
      className={twMerge(
        'flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full transition duration-300 hover:scale-105 hover:bg-emerald-400 hover:text-emerald-400',
        isActive
          ? 'bg-emerald-500 text-fuchsia-200'
          : 'bg-emerald-200 text-gray-500'
      )}
    >
      <span className="text-base font-medium">
        {new Date(value as any)
          .toLocaleString('en-US', { weekday: 'long' })
          .slice(0, 3)}
      </span>
      <span className="text-3xl font-bold">
        {new Date(value as any).getDate()}
      </span>
    </div>
  );
};

export default Days;

interface DayProps {
  value?: Date;
  onSelect?: (value: Date | undefined) => void;
  selected?: Date | undefined;
}

export const generateDatesNew = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);;

  while (currentDate <= endDate) {
    if (dates.length > 30) break;
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};