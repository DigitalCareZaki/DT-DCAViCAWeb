'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import type { CounterProps } from './types';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const Counter: ClientComponentProps<CounterProps> = ({
  start_date,
  title,
  description,
  id,
  status,
}) => {
  const [user] = useUser();

  const [value, setValue] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    seconds: 0,
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!start_date) return;

    const startDate = new Date(start_date);

    if (Number.isNaN(startDate.getTime())) return;

    const updateCounter = () => {
      const now = new Date();

      if (now >= startDate) {
        setValue({ day: 0, hour: 0, minute: 0, seconds: 0 });
        setIsActive(true);
        return;
      }

      const diff = startDate.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setValue({
        day: days,
        hour: hours,
        minute: minutes,
        seconds: seconds,
      });

      setIsActive(false);
    };

    updateCounter();

    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, [start_date]);

  return (
    <div className="abstract-svg opacity absolute left-0 top-0 flex h-full w-full rounded-2xl">
      <div className="z-[99] flex h-full w-full flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <span className="text-[40px] font-black text-fuchsia-200">
            {title}
          </span>
          <span className="w-[50%] text-center text-sm font-bold text-fuchsia-200">
            {description}
          </span>
        </div>

        {['ACTIVE', 'ONGOING', 'PENDING'].includes(status) ? (
          <>
            <span
              className={twMerge(
                'mt-2 text-2xl font-black text-fuchsia-200',
                isActive && 'hidden'
              )}
            >
              {value.day}D:{value.hour}H:{value.minute}M:{value.seconds}S
            </span>

            <Link
              passHref
              href={`/${user.role?.toLowerCase()}/telemed/appointment/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              // className={twMerge(isActive ? 'flex' : 'hidden')} // TOOD: removed temporarily
            >
              <button className="mt-10 h-11 w-fit rounded-full bg-white/20 px-10 text-xs font-bold text-fuchsia-200 transition duration-300 hover:scale-[110%] hover:bg-white/40 hover:text-fuchsia-900">
                Join Meeting
              </button>
            </Link>
          </>
        ) : (
          <div className="mt-4 h-fit w-fit rounded-full bg-white/20 px-4 py-2 font-semibold text-fuchsia-200">
            <span>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
