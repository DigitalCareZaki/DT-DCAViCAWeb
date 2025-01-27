'use client';

import React, { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';

import type { ECGChartProps } from './types';

const Chart = dynamic(() => import('react-apexcharts'));

const ECGChart: React.FC<ECGChartProps> = ({
  data,
  height = 400,
  width = 1200,
}) => {
  return (
    <Suspense fallback={<span>Loading Chart</span>}>
      <Chart
        options={{
          chart: {
            id: 'ecg-chart',
            type: 'line',
            zoom: {
              enabled: false,
            },
            width,
            height,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            type: 'category',
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
            title: {
              text: 'Voltage (mV)',
            },
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
          grid: {
            show: false,
          },
          colors: ['#0070FA'],
        }}
        type="line"
        series={[
          {
            name: 'ECG',
            data: data,
          },
        ]}
        width={width}
        height={height}
      />
    </Suspense>
  );
};

export default ECGChart;
