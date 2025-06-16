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
      <div className="flex h-full w-full">
        <People />
        <Conversation />
        <Information />
      </div>
    </>
  );
};

export default Chat;
