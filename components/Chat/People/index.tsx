'use server';

import { fetchChatRooms } from '@service';

import Messages from './Messages';
import Topbar from './Topbar';

import type { ServerComponent } from '@types';

const People: ServerComponent = async () => {
  const res = await fetchChatRooms();

  if (!res.success) return <></>;

  return (
    <div className="hidescrollbar flex h-full w-[20%] flex-col gap-10 bg-white p-4 overflow-y-auto">
      <Topbar />
      <Messages data={res.data} />
    </div>
  );
};

export default People;