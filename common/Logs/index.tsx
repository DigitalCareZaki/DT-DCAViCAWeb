'use server';

import Header from './Header';
import Table from './Table';

import { PageInfo } from '@common';
import { getLogs } from '@service';

import type { ServerComponent } from '@types';

const Logs: ServerComponent = async () => {
  const res = await getLogs();

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Header data={res.data} />
      <Table data={res.data ?? []} />
    </div>
  );
};

export default Logs;
