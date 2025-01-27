'use server';

import type { ServerComponent } from '@types';

const ComplianceSkeleton: ServerComponent = async () => {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="h-72 w-full animate-pulse rounded-lg bg-gray-400"></div>
      <div className="flex h-1/2 w-full flex-row gap-6">
        <div className="h-full w-1/2 animate-pulse rounded-lg bg-gray-400"></div>
        <div className="h-full w-1/2 animate-pulse rounded-lg bg-gray-400"></div>
      </div>
    </div>
  );
};

export default ComplianceSkeleton;
