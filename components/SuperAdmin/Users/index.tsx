'use server';

import { getOrganizationUsers } from '@service';

import Header from './Header';
import Table from './Table';
import Chart from './Charts';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Users: ServerComponentProps<Props> = async ({ role }) => {
  const res = await getOrganizationUsers('', role);


  if (!res.success) return <></>;

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-5 overflow-hidden py-4 pl-4 pr-4 font-poppins">
      <Chart data={res.data} />
      <Header />
      <div className="min-h-0 flex-1">
        <Table data={res.data} />
      </div>
    </div>
  );
};

export default Users;
