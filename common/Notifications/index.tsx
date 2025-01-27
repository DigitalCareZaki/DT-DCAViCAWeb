'use server';

import { PageInfo } from '@common';
import { getNotifications } from '@service';

import Table from './Table';
import type { ServerComponent } from '@types';

const Notifications: ServerComponent = async () => {
  const res = await getNotifications();

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      {/* <Header /> */}
      <Table data={res.data ?? []} />
    </div>
  );
};

export default Notifications;
