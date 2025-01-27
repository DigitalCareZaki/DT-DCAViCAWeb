'use server';

import { Compliance } from '@common';

import type { ServerComponent } from '@types';

const ComplianceWrapper: ServerComponent = async () => {
  return <Compliance />;
};

export default ComplianceWrapper;
