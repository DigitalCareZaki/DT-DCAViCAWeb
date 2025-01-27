'use client';

import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { getName } from '@init-globals';

import type { ClientComponentProps } from '@types';
import Image from 'next/image';

const Chat: ClientComponentProps<any> = ({
  message,
  auhor: author,
  currentUserId,
  created_at,
  media,
}) => {
  const isCurrentUser: boolean = useMemo(
    () => currentUserId === author?.id,
    [currentUserId, author?.id]
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
                ...author,
              })}
        </span>
        <div className="theme-bg-color w-fit rounded-lg px-4 py-2 text-end text-white">
          {media && (
            <div className="relative my-2 h-40 w-40 rounded-lg">
              <Image
                src={media}
                alt={message}
                fill
                className="h-full w-full rounded-lg object-cover"
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
