'use server';

import type { ServerComponent } from '@types';

import People from './People';
import Conversation from './Conversation';
import Information from './Information';
import { getUser } from '@actions';
import {
  PrimaryHeader,
} from '@common';
const Chat: ServerComponent = async () => {
  const user = await getUser();
  return (
    <>
      <PrimaryHeader user={user as any} />
      <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
        <People />
        <div className="w-[1px] bg-gray-200" />
        <Conversation />
        <div className="w-[1px] bg-gray-200" />
        <Information />
      </div>
    </>
  );
};

export default Chat;