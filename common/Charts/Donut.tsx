'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import type { DonutProps } from './types';

const Chart = dynamic(() => import('react-apexcharts'));

export default function Donut({ title, values }: DonutProps): JSX.Element {
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
            labels: ['High', 'Normal', 'Low', 'No Reading'],
            colors: ['#DB0000', '#00990F', '#F19F00', '#0400C1'],
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
          width={200}
          height={150}
        />
        {/* <p>{values.filter((val) => val).length}</p> */}
        <p>{values.reduce((acc, num) => acc + num, 0)}</p>
      </div>
    </Suspense>
  );
}
