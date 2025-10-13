'use client';

import Vitals from './index';
import type { ServerWrapperProps } from './types';

export default function VitalsServerWrapper({ id }: ServerWrapperProps) {
  // TODO: Fetch data on the client with useEffect or SWR if needed
  // For now, just render Vitals with an empty array
  let appointmentId = id;



  return <Vitals data={[]} appointmentId={appointmentId} />;
}
