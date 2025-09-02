'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

import { generateDates } from '@init-globals';
import { ClientGenerator } from '@common';

import type { ClientComponentProps } from '@types';
import type { DaysProps } from '../types';
import { twMerge } from 'tailwind-merge';
import type { GeneratorProps } from '../../../../../common/Generator/types';

const Days: ClientComponentProps<DaysProps> = ({ onSelect, selected, startDate, endDate, selectedMonth, filteredDays }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [days, setDays] = useState<Date[]>([]);
  const [groupedDays, setGroupedDays] = useState<{ month: string; dates: Date[] }[]>([]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    // If we have filtered days for a specific month, use those
    if (selectedMonth && filteredDays && filteredDays.length > 0) {
      setDays(filteredDays);
      // Group the filtered days by month (should be just one month)
      const grouped = groupDaysByMonth(filteredDays);
      setGroupedDays(grouped);
    } else {
      // Use all days from start to end date
      var data = generateDatesNew(startDate, endDate);
      setTestS({
        data: data.map((el) => ({ value: el })),
      });
      setDays(data);

      // Group days by month
      const grouped = groupDaysByMonth(data);
      setGroupedDays(grouped);
    }
  }, [startDate, endDate, selectedMonth, filteredDays]);

  const groupDaysByMonth = (dates: Date[]) => {
    const groups: { month: string; dates: Date[] }[] = [];
    let currentMonth = '';
    let currentGroup: Date[] = [];

    dates.forEach((date) => {
      const monthKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      if (monthKey !== currentMonth) {
        if (currentGroup.length > 0) {
          groups.push({ month: currentMonth, dates: currentGroup });
        }
        currentMonth = monthKey;
        currentGroup = [date];
      } else {
        currentGroup.push(date);
      }
    });

    // Add the last group
    if (currentGroup.length > 0) {
      groups.push({ month: currentMonth, dates: currentGroup });
    }

    return groups;
  };

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
    <div className="relative flex w-[80%] items-center justify-center">
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
        className="hidescrollbar relative flex w-[90%] gap-6 overflow-y-hidden overflow-x-scroll rounded-full p-2"
      >
        {selectedMonth && filteredDays ? (
          // Show filtered days for selected month
          days.map((el) => (
            <Day
              key={el.getTime()}
              value={el}
              onSelect={onSelect}
              selected={selected}
            />
          ))
        ) : (
          // Show all days grouped by month
          groupedDays.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col items-center gap-2">
              {/* Month Header */}
              <div className="flex gap-1 rounded-full bg-emerald-500 p-2 px-4 text-xs text-fuchsia-50">
                <span className='text-lg font-semibold'>
                  {group.month}
                </span>
              </div>

              {/* Days for this month */}
              <div className="flex gap-2">
                {group.dates.map((date, dateIndex) => (
                  <Day
                    key={`${groupIndex}-${dateIndex}`}
                    value={date}
                    onSelect={onSelect}
                    selected={selected}
                  />
                ))}
              </div>
            </div>
          ))
        )}
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

  // Check if this day is from a different month than the selected date
  const isFromDifferentMonth = useMemo(() => {
    if (!selected || !value) return false;
    const selectedMonth = new Date(selected).getMonth();
    const selectedYear = new Date(selected).getFullYear();
    const valueMonth = new Date(value).getMonth();
    const valueYear = new Date(value).getFullYear();
    return selectedMonth !== valueMonth || selectedYear !== valueYear;
  }, [value, selected]);

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
          : isFromDifferentMonth
            ? 'bg-blue-200 text-blue-700 border-2 border-blue-400' // Different month indicator
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
      {isFromDifferentMonth && (
        <span className="text-xs text-blue-600 font-semibold">
          {new Date(value as any).toLocaleDateString('en-US', { month: 'short' })}
        </span>
      )}
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
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};