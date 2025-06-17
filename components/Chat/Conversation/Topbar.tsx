'use client';

import Image from 'next/image';

import { TooltipBasic } from '@common';

import { FaFileAlt } from '@react-icons/all-files/fa/FaFileAlt';
import { IoMdImage } from '@react-icons/all-files/io/IoMdImage';
import { getName, getProfilePicture } from '@init-globals';

import type { ClientComponent } from '@types';
import { useSelector } from 'react-redux';
import type { ReduxProps, StoreChatState } from '@store-types';

const Topbar: ClientComponent = () => {
  const { selectedRooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );

  if (!selectedRooms?.id || !selectedRooms?.users?.length) return <></>;

  return (
    <div className="flex h-fit w-full items-center justify-between border-b border-gray-main/40 pb-4 text-gray-800">
      <span className="text-sx text-gray-800">
        {getName({
          first_name: selectedRooms.users[0].first_name,
          middle_name: selectedRooms.users[0].middle_name,
          last_name: selectedRooms.users[0].last_name,
        })}
      </span>
      <div className="flex items-center gap-8 text-gray-main ">
        {/* <TooltipBasic
          title="Browse Pictures"
          className="tooltip-theme-background flex w-32 items-center justify-center text-center"
        >
          <IoMdImage
            size={18}
            className="hover:theme-text-color cursor-pointer"
          />
        </TooltipBasic>
        <TooltipBasic
          title="Browse Documents"
          className="tooltip-theme-background flex w-36 items-center justify-center text-center"
        >
          <FaFileAlt
            size={16}
            className="hover:theme-text-color cursor-pointer"
          />
        </TooltipBasic> */}
      </div>
      <div className="relative h-10 w-10 rounded-full">
        <Image
          src={getProfilePicture(selectedRooms.users[0].uri)}
          fill
          className="rounded-full object-cover"
          alt="profile-picture"
        />
      </div>
    </div>
  );
};

export default Topbar;
