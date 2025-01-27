'use server';

import Header from './Home/Header';
import Table from './Home/Table';

import { getUser, getTablets, getAllTabletsForPatient } from '@service';

import type { Props } from './types';
import type { ServerComponentProps } from '@types';

const Tablets: ServerComponentProps<Props> = async ({ patient }) => {
  const user = await getUser();
  if (!user?.role) return <></>;

  const res = patient
    ? await getAllTabletsForPatient(patient)
    : await getTablets();

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header userRole={user.role?.toLowerCase()} data={res.data} />
      <Table userRole={user.role?.toLowerCase()} data={res.data} />
    </div>
  );
};

export default Tablets;
