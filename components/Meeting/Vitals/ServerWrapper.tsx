'use client';

import Vitals from './index';
import type { ServerWrapperProps } from './types';

export default function VitalsServerWrapper({ id }: ServerWrapperProps) {
  // TODO: Fetch data on the client with useEffect or SWR if needed
  // For now, just render Vitals with an empty array

  console.log('vital id >>>>', id);

  return <Vitals data={[]} />;
}
