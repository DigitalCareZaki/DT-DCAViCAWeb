'use server';

import { ServerGenerator } from '@common';
import { getInbox } from '@service';

import Header from './Header';
import SidebarList from './SidebarList';

import type { ServerComponentProps } from '@types';
import type { SidebarProps } from './types';

const Sidebar: ServerComponentProps<SidebarProps> = async ({
  type = 'inbox',
  search,
}) => {
  const res = await getInbox(type, search);

  if (!res.success) return <></>;

  // Keep data as-is; backend ordering preferred (unread first / newest first)
  const initialData = Array.isArray(res.data) ? res.data : [];


  return (
    <div className="flex h-[95%] w-[20%] flex-col items-center justify-between gap-10 border-r bg-white p-11 px-4">
      <Header type={type} search={search} />
      <div className="hidescrollbar flex h-full w-full flex-col overflow-y-scroll ">
        <SidebarList initialData={initialData} />
      </div>
    </div>
  );
};

export default Sidebar;
