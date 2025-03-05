'use server';

import { PatientMeasurement } from '@components';
import Analytics from './Analytics';
import Medication from '../Medications';
import { getPatientMeasurements, getSinglePatientRag } from '@service';
import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Dashboard: ServerComponentProps<Props> = async ({ patient, type }) => {
  const measurements = await getPatientMeasurements(patient, type, 1, 100);
  const res = await getSinglePatientRag(patient);

  if (!measurements.success || !res.success) return <></>;

  const rag = {
    bloodpressure: Object.values(res.data.bloodpressure),
    spo2: Object.values(res.data.spo2),
    bloodglucose: Object.values(res.data.bloodglucose),
    temperature: Object.values(res.data.temperature),
  };

  return (
    <div className="mt-10 flex flex-col gap-6 overflow-y-scroll">
      {/* Analytics Section */}
      <div className="w-full">
        <Analytics data={rag as any} />
      </div>
      {/* Medication and Patient Measurements */}
      <div className="flex w-full flex-col gap-6">
        <Medication patient={patient} />
        <PatientMeasurement
          data={measurements.data}
          patient={patient}
          type={type}
        />
      </div>
    </div>
  );
};

export default Dashboard;
