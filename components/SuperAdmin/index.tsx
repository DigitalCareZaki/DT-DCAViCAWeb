'use server';

import { PageInfo } from '@common';

import Analytics from './Home/Analytics';
import Table from './Home/Table';
import BranchTable from './Home/BranchTable';
import type { ServerComponent } from '@types';

const SuperAdmin: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Analytics />
      <div className="flex h-full w-full flex-col text-white">
        <Table />
      </div>
      <div className="flex h-full w-full flex-col text-white">
        <BranchTable />
      </div>
    </div>
  );
};

export default SuperAdmin;
