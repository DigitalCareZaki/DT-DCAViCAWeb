'use client';

import dynamic from 'next/dynamic';

import type { AnalyticsProps } from './types';

import type { ClientComponentProps } from '@types';

const Donut = dynamic(() => import('../../../common/Charts/Donut'), {
  ssr: false,
});

const Analytics = async ({ data }: any) => {
  return (
    <div className="h-full w-full">
      <div className="flex h-52 flex-col items-center justify-center gap-6 overflow-x-auto rounded-2xl border border-theme-patient-primary bg-white py-2 sm:flex-row">
        {/* Wrapping the Donut charts in a flex container for horizontal scrolling */}
        <div className="flex min-w-max space-x-6">
          <Donut title="Blood Pressure" values={data?.bloodpressure} />
          <Donut title="Sp02 Reading" values={data?.spo2} />
          <Donut title="Blood Glucose" values={data?.bloodglucose} />
          <Donut title="Temperature" values={data?.temperature} />
          <Donut title="ECG" values={[] as any} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
