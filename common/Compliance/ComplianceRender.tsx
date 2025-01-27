'use client';

import dynamic from 'next/dynamic';

import Table from './Table';
import MedicationTable from './MedicationTable';

import type { ComplianceRenderProps } from './types';
import type { ClientComponentProps } from '@types';

const ProgressLevelChart = dynamic(() => import('../Charts/ProgressLevel'), {
  ssr: false,
  loading: () => <>Loading Chart</>,
});

const ComplianceRender: ClientComponentProps<ComplianceRenderProps> = ({
  data,
}) => {
  return (
    <div className="flex h-full flex-col gap-6">
      {/* Progress Chart Section */}
      <div className="h-72 w-full rounded-lg bg-white p-6">
        <ProgressLevelChart />
      </div>

      {/* Tables Section - Stack on smaller screens */}
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="h-full w-full rounded-lg bg-white p-6 md:w-1/2">
          <Table data={data} />
        </div>
        <div className="h-full w-full rounded-lg bg-white p-6 md:w-1/2">
          <MedicationTable />
        </div>
      </div>
    </div>
  );
};

export default ComplianceRender;
