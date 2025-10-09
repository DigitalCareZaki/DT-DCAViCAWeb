'use client';

import Image from 'next/image';

import { getProfilePicture } from '@init-globals';

import type { ClientComponentProps } from '@types';
import type { SenderProps } from './types';

const Sender: ClientComponentProps<SenderProps> = ({
  message,
  sendedAt,
  author,
  media,
}) => {
  return (
    <div className="flex w-full shrink-0 items-end gap-4">
      <div className="relative h-7 w-7 rounded-full">
        <Image
          src={getProfilePicture(author?.uri)}
          className="rounded-full object-cover"
          fill
          alt="profile-picture"
        />
      </div>
      <div className="relative flex w-fit max-w-[80%] flex-col rounded-bl-sm rounded-br-xl rounded-tl-xl rounded-tr-xl bg-gray-700 p-3 py-2 text-base leading-relaxed text-white">
        {media && (
          <div className="relative my-2 h-48 w-48 rounded-lg">
            <Image
              src={media}
              className="h-full w-full rounded-lg"
              fill
              alt={message}
            />
          </div>
        )}
        <p className="whitespace-pre-wrap break-words">{message}</p>
        <span className="mt-1 text-xs text-white/60">{sendedAt}</span>
      </div>
    </div>
  );
};

export default Sender;