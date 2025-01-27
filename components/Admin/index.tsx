'use server';

import { PageInfo } from '@common';

import Analytics from './Home/Analytics';
import Table from './Home/Table';

import type { ServerComponent } from '@types';

const Admin: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Analytics />
      <div className="flex h-full w-full flex-col text-white">
        <Table />
      </div>
    </div>
  );
};

export default Admin;
