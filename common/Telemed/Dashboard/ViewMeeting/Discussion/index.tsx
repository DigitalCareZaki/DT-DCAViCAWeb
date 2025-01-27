'use server';

import { ServerGenerator } from '@common';
import { fetchMeetingsChats } from '@service';
import { getUser } from '@actions';

import Chat from './Chat';

import type { ServerComponentProps } from '@types';
import type { MeetingDiscussionProps } from './types';

const Discussion: ServerComponentProps<MeetingDiscussionProps> = async ({
  id,
}) => {
  const user = await getUser();
  const res = await fetchMeetingsChats(id);

  if (!res.success) return <div>Something went wrong</div>;

  return (
    <div className="flex h-[60vh] w-[30%] flex-col justify-between rounded-2xl bg-dark-secondary p-4">
      <div className="flex w-full shrink-0 flex-col">
        <span className=" font-semibold text-white">Discussion</span>
      </div>
      <div className="hidescrollbar flex h-[92%] w-full flex-grow-0 flex-col gap-4 overflow-y-scroll rounded-xl bg-dark-main p-4">
        <ServerGenerator data={res.data.chats} currentUserId={user?.id}>
          <Chat />
        </ServerGenerator>
      </div>
    </div>
  );
};

export default Discussion;
