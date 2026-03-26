'use server';

import { PageInfo } from '@common';
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
    <div className="mt-10 flex w-full flex-col gap-6 pl-4 pb-6 font-poppins">
      {/* <PageInfo /> */}
      <Chart data={res.data} />
      <Header />
      <Table data={res.data} />
    </div>
  );
};

export default Users;
