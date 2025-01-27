'use server';

import { PageInfo } from '@common';
import { getSuperAdminBranches } from '@service';

import Header from './Header';
import Table from './Table';

import type { ServerComponent } from '@types';

const Branches: ServerComponent = async () => {
  const res = await getSuperAdminBranches();

  if (!res.success) return <></>;

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4  font-poppins">
      <PageInfo />
      <Header data={res.data} />
      <Table data={res.data} />
    </div>
  );
};

export default Branches;
