'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { useSelector } from 'react-redux';

import type { ProgressLevelProps } from './types';
import type { ReduxProps, StoreComplianceState } from '@store-types';
import { PatientCompliance } from '@types';

const Chart = dynamic(() => import('react-apexcharts'));

export default function ProgressLevel({
  colors = ['#0070FA', '#2A9B8A', '#9B2A2A'],
}: ProgressLevelProps): JSX.Element {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [dynamics, setDynamics] = useState({
    width: 0,
    height: 0,
  });

  const { selected } = useSelector<ReduxProps, StoreComplianceState>(
    (state) => state.compliance
  );
  const [compliance, setCompliance] = useState<PatientCompliance>({});

  useEffect(() => {
    setCompliance(selected.data ?? {});
  }, [selected.id]);

  useEffect(() => {
    if (!chartContainer.current) return;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        setDynamics((prev) => {
          if (prev.width === 0 && prev.height === 0) {
            return {
              width: el.target.clientWidth,
              height: el.target.clientHeight,
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
    <Suspense fallback={<span>Loading Chart...</span>}>
      <div
        ref={chartContainer}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <Chart
          options={{
            chart: {
              type: 'bar',
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '20%',
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: false,
            },
            xaxis: {
              categories: Object.keys(compliance).map((el) =>
                new Date(el).toDateString()
              ),
              labels: {
                style: {
                  fontSize: '1.5rem', // 1.5rem for readability at 150% zoom
                  fontWeight: 500,
                  colors: '#4A4A4A',
                },
              },
            },
            yaxis: {
              show: false,
            },
            colors,
            grid: {
              show: false,
            },
            fill: {
              opacity: 1,
            },
            tooltip: {
              style: {
                fontSize: '1.5rem', // Ensuring tooltips are readable

              },
            },
            title: {
              text: 'Compliance Levels',
              align: 'center',

            },
          }}
          series={[
            {
              name: 'Total',
              data: Object.values(compliance).map((el: any) => el?.total ?? 0),
            },
            {
              name: 'Compliant',
              data: Object.values(compliance).map((el: any) => el?.taken ?? 0),
            },
            {
              name: 'Not Compliant',
              data: Object.values(compliance).map(
                (el: any) => el?.not_taken ?? 0
              ),
            },
          ]}
          type="bar"
          width={dynamics.width}
          height={dynamics.height}
        ></Chart>
      </div>
    </Suspense>
  );
}
