'use client';

import Image from 'next/image';

import { getProfilePicture } from '@init-globals';

import type { ClientComponentProps } from '@types';
import type { RecieverProps } from './types';

const Reciver: ClientComponentProps<RecieverProps> = ({
  message,
  sendedAt,
  author,
  media,
}) => {
  return (
    <div className="flex w-full shrink-0 items-end justify-end gap-4">
      <div className="theme-bg-color relative flex w-fit max-w-[80%] flex-col rounded-bl-xl rounded-br-sm rounded-tl-xl rounded-tr-xl p-4 py-2 text-ssx text-white">
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

        <p>{message}</p>
        <span className="text-white/50">{sendedAt}</span>
      </div>
      <div className="relative h-8 w-8">
        <Image
          src={getProfilePicture(author?.uri)}
          className="rounded-full object-cover"
          fill
          alt="profile-picture"
        />
      </div>
    </div>
  );
};

export default Reciver;