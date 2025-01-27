'use client';

import CountUp from 'react-countup';

import type { Props } from './types';

export default function Counter({ prefix, value }: Props): JSX.Element {
  return <CountUp separator="," prefix={prefix} start={0} end={value} />;
}
