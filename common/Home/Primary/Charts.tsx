'use client';

import dynamic from 'next/dynamic';

import Appointments from './Appointments';

import type { Props } from './types';
import type { ClientComponentProps } from '@types';

const Donut = dynamic(() => import('../../Charts/Donut'), {
  ssr: false,
});

const ComplianceChart = dynamic(() => import('../../Charts/Compliance'), {
  ssr: false,
});

const Charts: ClientComponentProps<Props> = ({
  appointments,
  compliance,
  rag,
}) => {
  console.log(appointments, compliance, rag, '=====>>>data');
  return (
    <>
      {/* Appointments and Compliance Section */}
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Appointments Card */}
        <Appointments appointments={appointments} />

        {/* Compliance Chart */}
        <div className="flex h-56 w-full flex-col rounded-2xl border bg-white py-4 md:w-1/2 lg:w-1/3">
          <div className="w-full text-center">
            <span className="text-base font-semibold uppercase tracking-wider text-secondary">
              Compliance - Weekly
            </span>
          </div>
          <div className="h-full w-full">
            <ComplianceChart data={compliance} />
          </div>
        </div>
      </div>

      {/* Donut Charts and Legend Section */}
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Donut Charts */}
        <div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl border bg-white px-4 py-6 lg:w-4/5">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <Donut title="Blood Pressure" values={rag.bloodpressure} />
            <Donut title="Sp02 Reading" values={rag.spo2} />
            <Donut title="Blood Glucose" values={rag.bloodglucose} />
            <Donut title="Temperature" values={rag.temperature} />
            {/* <Donut title="ECG" values={[] as any} /> */}
          </div>
        </div>

        {/* Legend */}
        <div className="flex w-full flex-col justify-between gap-4 rounded-2xl border bg-white p-6 lg:w-1/5">
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-2xl bg-rag-red"></div>
            <p className="text-lg">High</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-2xl bg-rag-green"></div>
            <p className="text-lg">Normal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-2xl bg-rag-amber"></div>
            <p className="text-lg">Low</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-2xl bg-rag-no-reading"></div>
            <p className="text-lg leading-none">Reading not taken</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
