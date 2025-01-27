'use server';

import { PageInfo, ButtonPrimary } from '@common';
import { getOrganizations } from '@service';

import Table from './Table';

import type { ServerComponent } from '@types';
import Link from 'next/link';

const Organizations: ServerComponent = async () => {
  const res = await getOrganizations();

  if (!res.success) return <></>;

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <div className="flex w-full justify-end">
        <div className="w-40">
          <Link passHref href="/master/organizations/create">
            <ButtonPrimary name="Create" />
          </Link>
        </div>
      </div>
      <Table data={res.data} />
    </div>
  );
};

export default Organizations;
