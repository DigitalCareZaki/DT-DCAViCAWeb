'use server';

import { PrimaryHome } from '@common';

import { getAllPatientsRag, getAllPatientsCompliance, getAppointmentStats } from '@service';

import type { ServerComponent } from '@types';

const Dashboard: ServerComponent = async () => {
  const res = await getAllPatientsRag();
  const compliance = await getAllPatientsCompliance();
  const stats = await getAppointmentStats('doctor');

  console.log('res.success || compliance.success || stats.success', res.success, compliance.success, stats.success);

  if (!res.success || !compliance.success || !stats.success) return <></>;

  const rag = {
    bloodpressure: Object.values(res?.data?.bloodpressure),
    spo2: Object.values(res?.data?.spo2),
    bloodglucose: Object.values(res?.data?.bloodglucose),
    temperature: Object.values(res?.data?.temperature),
  };

  return (
    <PrimaryHome
      appointments={stats.data}
      compliance={compliance.data}
      rag={rag as any}
    />
  );
};

export default Dashboard;
