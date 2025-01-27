'use client';

import { getName } from '@init-globals';

import type { ClientComponentProps } from '@types';
import Image from 'next/image';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const Chat: ClientComponentProps<any> = ({
  message,
  user_id,
  middle_name,
  last_name,
  first_name,
  created_at,
  currentUserId,
  media,
}) => {
  const isCurrentUser: boolean = useMemo(
    () => currentUserId === user_id,
    [currentUserId, user_id]
  );

  return (
    <div
      className={twMerge(
        'flex w-full justify-end text-ssx',
        !isCurrentUser && 'flex-row-reverse'
      )}
    >
      <div
        className={twMerge(
          'flex flex-col items-end gap-1',
          isCurrentUser ? 'items-end' : 'items-start'
        )}
      >
        <span className="text-end text-gray-400">
          {isCurrentUser
            ? 'You'
            : getName({
                first_name,
                last_name,
                middle_name,
              })}
        </span>
        <div className="theme-bg-color w-fit rounded-lg px-4 py-2 text-end text-white">
          {media && (
            <div className="relative my-2 h-32 w-32 rounded-lg">
              <Image
                src={media}
                fill
                alt={message}
                className="h-full w-full rounded-lg"
              />
            </div>
          )}

          <span>{message}</span>
        </div>
        <span className="text-right text-gray-400">
          {new Date(created_at).toDateString()}
        </span>
      </div>
    </div>
  );
};

export default Chat;
