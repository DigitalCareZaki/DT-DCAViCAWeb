'use server';

import dynamic from 'next/dynamic';

import Header from './Header';
import Patients from './Patients';
import Discussion from './Discussion';

import type { ServerComponent } from '@types';

const Chart = dynamic(() => import('../../Charts/ECGBasic'), {
  ssr: false,
});

const generateECGData = (numPoints: number): number[] => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    // Simulate a basic ECG waveform
    const baseValue = 0.5;
    const amplitude = 0.2; // Adjust for desired amplitude
    const noise = Math.random() * 0.1 - 0.05; // Random noise
    const value = baseValue + amplitude * Math.sin((i * Math.PI) / 20) + noise;
    data.push(value);
  }
  return data;
};

const ViewAppointment: ServerComponent = async () => {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-scroll pb-40 pt-6">
      <Header />
      <div className="flex w-full gap-6">
        <Patients />
        <Discussion />
      </div>
      <div className="grid w-full grid-cols-4 gap-4">
        <div className="col-span-2 h-96 w-full rounded-lg bg-white p-6">
          <div className="flex h-full flex-col justify-between">
            <span className="screen-title normal-case">
              Electrocardiography
            </span>
            <div className="h-60 ">
              <Chart data={generateECGData(100)} width={600} height={240} />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-96 w-full rounded-lg bg-white p-6">
          <span className="screen-title normal-case">Blood Pressure</span>
        </div>
        <div className="col-span-1 h-96 w-full rounded-lg bg-white p-6">
          <span className="screen-title normal-case">Blood Glucose</span>
        </div>
        <div className="col-span-2 h-96 w-full rounded-lg bg-white p-6">
          <span className="screen-title normal-case">Temperature</span>
        </div>
        <div className="col-span-2 h-96 w-full rounded-lg bg-white p-6">
          <span className="screen-title normal-case">Oxygen Level</span>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
