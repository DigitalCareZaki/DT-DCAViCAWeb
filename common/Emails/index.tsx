'use server';

import { PageInfo } from '@common';
import { getEmailsHistory } from '@service';

import Table from './Table';

import type { ServerComponent } from '@types';

const Emails: ServerComponent = async () => {
  const res = await getEmailsHistory();

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Table data={res.data ?? []} />
    </div>
  );
};

export default Emails;
