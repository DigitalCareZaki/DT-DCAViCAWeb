'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { MdMessage } from '@react-icons/all-files/md/MdMessage';

import { useUser } from '@selectors';
import { handleEventReducer } from '@slice';
import { ClientGenerator } from '@common';

import Message from './Message';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreChatState } from '@store-types';

const Messages: ClientComponent = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { selectedRooms, chats } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );
  const [{ role: userType }] = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!selectedRooms?.id) return;

  //   (async () => {
  //     try {
  //       setLoading(true);
  //       // const res = await fetchRoomChats(selectedRooms.id);
  //       // setChats(res?.data?.chats);
  //     } catch (err) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [selectedRooms?.id]);

  useEffect(() => {
    if (!selectedRooms?.id) return;

    dispatch(
      handleEventReducer({
        event: 'room-init',
        payload: {
          room_id: selectedRooms?.id,
        },
      })
    );
  }, [selectedRooms]);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chats]);

  if (!selectedRooms?.users?.length && !selectedRooms?.id)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <MdMessage size={50} className="theme-text-color" />
        <span className="text-xs font-semibold text-gray-500">
          No Chat Selected
        </span>
      </div>
    );

  return (
    <div
      ref={scrollRef}
      className={twMerge(
        'hidescrollbar flex h-full w-full flex-col gap-4 overflow-y-scroll pb-16 pt-2',
        userType?.toLowerCase() === 'doctor' && 'doctor-scrollbar',
        userType?.toLowerCase() === 'nurse' && 'nurse-scrollbar'
      )}
    >
      <ClientGenerator data={chats[selectedRooms?.id] ?? []}>
        <Message />
      </ClientGenerator>
    </div>
  );
};

export default Messages;