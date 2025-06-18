'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { getName, getProfilePicture } from '@init-globals';
import { setSelectedRoomReducer, pushToSelectedRoomReducer } from '@slice';
import { createRoom } from '@service';

import type { ClientComponentProps } from '@types';
import type { MessageProps } from './types';
import type { ReduxProps, StoreChatState } from '@store-types';

const Message: ClientComponentProps<MessageProps> = ({ id, users }) => {
  const dispatch = useDispatch();
  const { selectedRooms, rooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );

  const selected = useMemo(
    () => selectedRooms?.id === id,
    [selectedRooms?.id, id]
  );

  const handleSelect = useCallback(async () => {
    if (!id) {
      if (!users?.length) return;

      const data = {
        user_id: users[0]?.id,
      };

      const room = rooms.find((el) => el.users[0]?.id === users[0]?.id);

      console.log('room: ', room);

      if (room?.id) {
        dispatch(setSelectedRoomReducer({ room }));

        return;
      }

      console.log('creating room');

      const res = await createRoom(btoa(JSON.stringify(data)));

      dispatch(
        setSelectedRoomReducer({
          room: { id: res?.data?.id as string, users: res?.data?.users ?? [] },
        })
      );

      dispatch(
        pushToSelectedRoomReducer({
          room: { id: res?.data?.id as string, users: res?.data?.users ?? [] },
        })
      );

      return;
    }

    dispatch(setSelectedRoomReducer({ room: { id, users: users ?? [] } }));
  }, [id, users, rooms]);

  if (!users?.length) return <></>;

  return (
    <AnimatePresence key={id}>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
        onClick={handleSelect}
        className={twMerge(
          'hover:theme-bg-color group flex h-14 w-full shrink-0 cursor-pointer items-center gap-4 rounded-md p-2 transition duration-300',
          selected ? 'theme-bg-color' : 'bg-dark-main'
        )}
      >
        <div className="relative h-10 w-10 shrink-0 rounded-full">
          <Image
            src={getProfilePicture(users[0]?.uri)}
            alt={users[0]?.first_name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="relative flex w-full">
            <span className="text-xs font-semibold text-white">
              {getName({
                first_name: users[0]?.first_name,
                last_name: users[0]?.last_name,
                middle_name: users[0]?.middle_name,
              })}
            </span>
            {/* Show new message badge if there are unread messages */}
            {users[0]?.hasNewMessage && (
              <div className="group-hover:theme-text-color theme-bg-color absolute right-0 flex h-4 w-auto items-center justify-center rounded-full px-2 text-ssx font-semibold text-white group-hover:bg-white">
                <span>new message</span>
              </div>
            )}
          </div>
          <span
            className={twMerge(
              'text-ssx group-hover:text-white',
              selected ? 'text-ssx text-white' : 'text-ssx text-gray-main'
            )}
            style={{
              fontSize: '10px',
            }}
          >
            Conversation...
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Message;