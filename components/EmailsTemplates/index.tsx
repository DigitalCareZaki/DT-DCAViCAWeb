'use server';

import { PageInfo } from '@common';
import { getEmailTemplates } from '@service';
import Table from './Table';

import type { ServerComponent } from '@types';

const EmailsTemplates: ServerComponent = async () => {
  const res = await getEmailTemplates();

  if (!res.success) return <></>;

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4 font-poppins">
      <PageInfo />
      <Table data={res.data ?? []} />
    </div>
  );
};

export default EmailsTemplates;
