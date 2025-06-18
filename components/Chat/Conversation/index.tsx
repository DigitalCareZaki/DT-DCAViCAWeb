'use client';

import Topbar from './Topbar';
import MessageBar from './MessageBar';
import Messages from './Messages';

import type { ClientComponent } from '@types';

const Conversation: ClientComponent = () => {
  return (
    <div className="relative flex flex-col flex-grow h-full w-[60%] min-h-0 overflow-hidden bg-gray-100 rounded-lg px-4 pt-4">
      <Topbar />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Messages />
      </div>
      <MessageBar />
    </div>
  );
};

export default Conversation;