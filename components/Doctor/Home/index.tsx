'use server';

import { PrimaryHome } from '@common';
import { getAllPatientsRag, getAllPatientsCompliance, getAppointmentStats } from '@service';
import type { ServerComponent } from '@types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryApi<T>(apiCall: () => Promise<T>, maxRetries: number = 6, delayMs: number = 1000): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await apiCall();
      if (result && (result as any).success === true) {
        return result;
      }
      // console.log(`Attempt ${i + 1} failed, retrying...`);
      await delay(delayMs);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      // console.log(`Attempt ${i + 1} failed with error, retrying...`);
      await delay(delayMs);
    }
  }
  throw new Error('Max retries reached');
}


const Dashboard: ServerComponent = async () => {
  try {
    const [res, compliance, stats] = await Promise.all([
      retryApi(() => getAllPatientsRag()),
      retryApi(() => getAllPatientsCompliance()),
      retryApi(() => getAppointmentStats('doctor'))
    ]);


    console.log('stats data >>>>>>>>', stats.data);


    if (!res?.success || !compliance?.success || !stats?.success) {
      return <></>;
    }

    const rag = {
      bloodpressure: Object.values(res?.data?.bloodpressure || {}),
      spo2: Object.values(res?.data?.spo2 || {}),
      bloodglucose: Object.values(res?.data?.bloodglucose || {}),
      temperature: Object.values(res?.data?.temperature || {})
    };

    return (
      <PrimaryHome
        appointments={stats.data}
        compliance={compliance.data}
        rag={rag as any}
      />
    );
  } catch (error) {
    console.error('Error in Dashboard after retries:', error);
    return <></>;
  }
};

export default Dashboard;