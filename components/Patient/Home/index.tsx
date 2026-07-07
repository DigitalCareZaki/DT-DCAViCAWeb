'use server';

import { PatientMeasurement } from '@components';
import Analytics from './Analytics';
import Medication from '../Medications';
import CareTeam from './CareTeam';
import {
  getAssignedCareTeam,
  getPatientMeasurements,
  getSinglePatientRag,
} from '@service';
import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Dashboard: ServerComponentProps<Props> = async ({ patient, type }) => {
  const [measurements, res, careTeam] = await Promise.all([
    getPatientMeasurements(patient, type, 1, 100),
    getSinglePatientRag(patient),
    getAssignedCareTeam(),
  ]);

  if (!measurements.success || !res.success) return <></>;

  const rag = {
    bloodpressure: res.data?.bloodpressure
      ? Object.values(res.data.bloodpressure)
      : [],
    spo2: res.data?.spo2 ? Object.values(res.data.spo2) : [],
    bloodglucose: res.data?.bloodglucose
      ? Object.values(res.data.bloodglucose)
      : [],
    temperature: res.data?.temperature
      ? Object.values(res.data.temperature)
      : [],
    // ecg: res.data?.ecg ? Object.values(res.data.ecg) : [],
  };


  return (
    <div className="mt-10 flex flex-col gap-6 overflow-y-scroll">
      {careTeam.success && careTeam.data && (
        <CareTeam careTeam={careTeam.data} />
      )}
      {/* Analytics Section */}
      <div className="w-full">
        <Analytics data={rag as any} />
      </div>
      {/* Medication and Patient Measurements */}
      <div className="flex w-full flex-col gap-6">
        <Medication patient={patient} />
        <PatientMeasurement
          data={measurements?.data}
          patient={patient}
          type={type}
        />
      </div>
    </div>
  );
};

export default Dashboard;
