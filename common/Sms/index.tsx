'use server';

import { PageInfo } from '@common';
import { getSmsHistory } from '@service';

import Table from './Table';

import type { ServerComponent } from '@types';

const SmsHistory: ServerComponent = async () => {
  const res = await getSmsHistory(1, 10);
  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Table data={res.data ?? []} />
    </div>
  );
};

export default SmsHistory;
