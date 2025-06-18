'use client';

import Topbar from './Topbar';
import MessageBar from './MessageBar';
import Messages from './Messages';

import type { ClientComponent } from '@types';

const Conversation: ClientComponent = () => {
  return (
    <div className="relative flex h-full w-[60%] flex-col p-4 overflow-hidden bg-gray-100 rounded-lg">
      <Topbar />
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>
      <MessageBar />
    </div>
  );
};

export default Conversation;