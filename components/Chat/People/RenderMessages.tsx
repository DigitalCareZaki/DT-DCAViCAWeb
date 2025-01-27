'use client';

import { ClientGenerator } from '@common';

import Message from './Message';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreChatState } from '@store-types';
import { useSelector } from 'react-redux';
import { CircleSpinner } from 'react-spinners-kit';

const RenderMessages: ClientComponent = () => {
  const { rooms, fetchingRooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );

  return (
    <div className="hidescrollbar flex h-screen w-full flex-col gap-4 overflow-y-scroll">
      {fetchingRooms ? (
        <div className="flex h-[70%] w-full flex-col items-center justify-center">
          <CircleSpinner color="#fff" size={22} />
        </div>
      ) : (
        <ClientGenerator data={rooms}>
          <Message />
        </ClientGenerator>
      )}
    </div>
  );
};

export default RenderMessages;
