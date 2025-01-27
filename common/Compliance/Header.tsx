'use server';

import type { ServerComponent } from '@types';

const ComplianceHeader: ServerComponent = async () => {
  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Compliance</span>
    </div>
  );
};

export default ComplianceHeader;
