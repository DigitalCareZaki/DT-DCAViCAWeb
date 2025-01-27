'use client';

import { ClientGenerator } from '@common';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useUser } from '@selectors';
import Chat from './Chat';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreMeetingState } from '@store-types';

const Discussion: ClientComponent = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [user] = useUser();
  const { chats } = useSelector<ReduxProps, StoreMeetingState>(
    (state) => state.meeting
  );

  useEffect(() => {
    if (!chats.length || !scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chats]);

  console.log('chats: ', chats);

  return (
    <div
      ref={scrollRef}
      className="hidescrollbar flex h-full w-full flex-grow-0 flex-col gap-4 overflow-y-scroll rounded-xl bg-dark-main p-4"
    >
      <ClientGenerator data={chats} currentUserId={user.id}>
        <Chat />
      </ClientGenerator>
    </div>
  );
};

export default Discussion;
