'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';

import { getProfilePicture, getName } from '@init-globals';

import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { ClientComponent } from '@types';

const Header: ClientComponent = () => {
  const { message } = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  if (!message.show) {
    return (
      <div className="flex h-[10%] w-full shrink-0 items-center border-y"></div>
    );
  }

  const threadMessages = message?.data?.threadMessages || [];

  return (
    <div>
      {threadMessages.map((message: any) => (
        <div
          key={message.id}
          className="flex h-[10%] w-full shrink-0 items-center justify-between border-y px-6"
        >
          <div className="flex gap-2">
            <div className="relative h-10 w-10 rounded-full">
              <Image
                src={getProfilePicture(message.sender.uri)}
                alt="profile picture"
                fill
                className="h-full w-full rounded-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">
                {getName({
                  first_name: message.sender.first_name ?? '',
                  middle_name: message.sender.middle_name ?? '',
                  last_name: message.sender.last_name ?? '',
                })}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                {message.sender.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">
              {new Date(message.created_at).toDateString()}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {new Date(message.created_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
