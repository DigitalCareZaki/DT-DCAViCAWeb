'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { getProfilePicture, getName } from '@init-globals';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreChatState } from '@store-types';

const Recipient: ClientComponent = () => {
  const { selectedRooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state?.chats
  );

  if (!selectedRooms?.id) return <></>;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-main py-4 text-sm text-white/80">
      <div className="relative h-20 w-20 rounded-full bg-white">
        <Image
          src={getProfilePicture(selectedRooms?.users[0]?.uri)}
          alt="profile-picture"
          className="rounded-full object-cover"
          fill
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="hover:theme-text-color cursor-pointer font-semibold transition duration-300">
          {getName({
            first_name: selectedRooms?.users[0]?.first_name as string,
            last_name: selectedRooms?.users[0]?.last_name as string,
            middle_name: selectedRooms?.users[0]?.middle_name as string,
          })}
        </span>
        <span className="text-ssx text-gray-main">
          {selectedRooms?.users[0]?.role}
        </span>
      </div>
    </div>
  );
};

export default Recipient;