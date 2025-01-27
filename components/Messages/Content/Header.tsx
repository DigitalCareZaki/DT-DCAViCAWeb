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

  return (
    <div className="flex h-[10%] w-full shrink-0 items-center justify-between border-y px-6">
      <div className="flex gap-2">
        <div className="relative h-10 w-10 rounded-full">
          <Image
            src={getProfilePicture(message.data?.sender.uri)}
            alt="profile picture"
            fill
            className="h-full w-full rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-500">
            {getName({
              first_name: message.data?.sender.first_name ?? '',
              middle_name: message.data?.sender.middle_name ?? '',
              last_name: message.data?.sender.last_name ?? '',
            })}
          </span>
          <span className="text-xs font-semibold text-gray-500">
            {message.data?.sender.email}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-500">
          {new Date(message.data?.created_at as any as Date).toDateString()}
        </span>
        <span className="text-xs font-semibold text-gray-500">
          {new Date(
            message.data?.created_at as any as Date
          ).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default Header;
