'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import type { ComplianceProps } from './types';

const Chart = dynamic(() => import('react-apexcharts'));

export default function Compliance({
  data,
  colors = ['#0070FA', '#2A9B8A', '#9B2A2A'],
}: ComplianceProps): JSX.Element {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [dynamics, setDynamics] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!chartContainer.current) return;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        setDynamics((prev) => {
          if (prev.width === 0 && prev.height === 0) {
            return {
              width: el.target.clientWidth - 10,
              height: el.target.clientHeight - 10,
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
  }, [chartContainer]);

  return (
    <Suspense fallback={<span>Loading Chart</span>}>
      <div
        ref={chartContainer}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <Chart
          options={{
            chart: {
              type: 'line',
              zoom: {
                enabled: false,
              },
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
            legend: {
              tooltipHoverFormatter: function (val, opts) {
                return (
                  val +
                  ' - <strong>' +
                  opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                  '</strong>'
                );
              },
            },
            xaxis: {
              categories: Object.keys(data).map((k) =>
                new Date(k).toLocaleDateString()
              ),
            },
            colors,
            grid: {
              show: false,
            },
          }}
          series={[
            {
              name: 'Total',
              data: Object.values(data).map((v) => v.total),
            },
            {
              name: 'Taken',
              data: Object.values(data).map((v) => v.taken),
            },
            {
              name: 'Not Taken',
              data: Object.values(data).map((v) => v.not_taken),
            },
          ]}
          type="line"
          width={dynamics.width}
          height={dynamics.height}
        ></Chart>
      </div>
    </Suspense>
  );
}
