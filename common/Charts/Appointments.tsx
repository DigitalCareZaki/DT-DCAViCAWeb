'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import type { AppointmentsProps } from './types';
import { twMerge } from 'tailwind-merge';

const Chart = dynamic(() => import('react-apexcharts'));

export default function Appointments({
  colors = ['#FFC460'],
  subtractHeight = 24,
}: AppointmentsProps): JSX.Element {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [dynamics, setDynamics] = useState({
    width: 400,
    height: 400,
  });

  useEffect(() => {
    if (!chartContainer.current) return;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        setDynamics((prev) => {
          if (
            prev.width !== el.target.clientWidth &&
            prev.height !== el.target.clientHeight - subtractHeight
          ) {
            return {
              width: el.target.clientWidth,
              height: el.target.clientHeight - subtractHeight,
            };
          }

          return prev;
        });
      });
    });

    observer.observe(chartContainer.current);

    return () => {
      observer.disconnect();
    };
  }, [chartContainer, subtractHeight]);

  return (
    <Suspense fallback={<span>Loading Chart</span>}>
      <div ref={chartContainer} className={twMerge('h-full w-full')}>
        <Chart
          options={{
            chart: {
              type: 'area',
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
            },
            labels: [
              '12:00 PM',
              '01:00 PM',
              '02:00 PM',
              '03:00 PM',
              '04:00 PM',
              '05:00 PM',
              '06:00 PM',
              '07:00 PM',
              '8:00 PM',
              '9:00 PM',
              '10:00 PM',
              '11:00 PM',
            ],
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            colors,
            grid: {
              show: false,
            },
          }}
          series={[
            {
              name: 'Appointments',
              data: [
                124, 224, 202, 289, 220, 178, 190, 220, 389, 456, 589, 532,
              ],
            },
          ]}
          type="area"
          width={dynamics.width}
          height={dynamics.height}
        />
      </div>
    </Suspense>
  );
}
