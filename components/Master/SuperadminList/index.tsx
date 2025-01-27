'use server';

import { ButtonPrimary, PageInfo } from '@common';
import { getSuperAdmins } from '@service';

import Table from './Table';

import type { ServerComponent } from '@types';
import Link from 'next/link';

const SuperadminList: ServerComponent = async () => {
  const res = await getSuperAdmins();

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <div className="mt-4 flex w-full justify-end">
        <div className="w-32">
          <Link passHref href="/master/superadmin/create">
            <ButtonPrimary name="Add Superadmin" />
          </Link>
        </div>
      </div>
      <Table data={res.data ?? []} />
    </div>
  );
};

export default SuperadminList;
