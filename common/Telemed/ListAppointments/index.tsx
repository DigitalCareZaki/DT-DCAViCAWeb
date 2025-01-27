'use server';

import Header from './Header';
import Table from './Table';
import Call from './Call';

import { getAppointments } from '@service';

import type { ServerComponent } from '@types';

const ListAppointment: ServerComponent = async () => {
  const res = await getAppointments();

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 pt-6">
      <Header />
      <Table appointments={res.data} />
      <Call />
    </div>
  );
};

export default ListAppointment;
