'use client';

import { useState, useEffect } from 'react';

import { MdTimelapse } from '@react-icons/all-files/md/MdTimelapse';

import type { ClientComponent } from '@types';

const Counter: ClientComponent = () => {
  const [uptime, setUptime] = useState<string>('00:00:00');
  const [startTime, setStartTime] = useState<number | null>(null);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  useEffect(() => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }, [startTime]);

  useEffect(() => {
    if (startTime !== null) {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const formattedTime = formatTime(elapsedTime);
        setUptime(formattedTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  return (
    <div
      title="uptime"
      className="theme-bg-color flex h-8 w-[85px] items-center justify-between gap-1 rounded-full px-2 text-ssx text-white"
    >
      <MdTimelapse size={18} />

      {uptime}
    </div>
  );
};

export default Counter;
