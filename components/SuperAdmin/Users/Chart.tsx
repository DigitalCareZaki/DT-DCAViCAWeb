'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import type { DonutProps } from './types';

const Chart = dynamic(() => import('react-apexcharts'));

export default function Donut({
  title,
  values,
  total,
}: DonutProps): JSX.Element {
  return (
    <Suspense fallback={<span>Loading Chart</span>}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Chart
          options={{
            chart: {
              type: 'donut',
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              pie: {
                customScale: 1.1,
                startAngle: -90,
                endAngle: 270,
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: false,
                    },
                    value: {
                      show: true,
                    },
                    total: {
                      show: false,
                    },
                  },
                },
              },
            },
            title: {
              text: title,
              align: 'center',
              margin: 10,
            },
            labels: ['Active', 'Unactive'],
            colors: ['#0ea5e9', '#f43f5e'],
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            fill: {
              type: 'gradient',
            },
          }}
          series={values}
          type="donut"
          width={180}
          height={120}
        />
        <p className="text-base font-bold">{total}</p>
      </div>
    </Suspense>
  );
}
