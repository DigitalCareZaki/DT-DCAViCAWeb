'use client';

import Image from 'next/image';

import { getProfilePicture, getName } from '@init-globals';

import type { ClientComponentProps } from '@types';

const Participant: ClientComponentProps<any> = ({ user, status }) => {
  return (
    <div className="flex w-fit gap-4 rounded-full bg-white/20 p-4 pr-4 text-xs">
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 rounded-full bg-fuchsia-800">
          <div className="absolute z-10 h-full w-full rounded-full bg-fuchsia-800/50" />
          <Image
            src={getProfilePicture(user?.uri)}
            alt="profile-picture"
            fill
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-fuchsia-200">
            {getName({ ...user })}
          </span>
          <span className="text-[10px] font-black text-fuchsia-200/80">
            {user?.role}
          </span>
        </div>
      </div>
      <div className="flex h-8 items-center justify-center rounded-full bg-fuchsia-800 px-4">
        <span className="text-[10px] font-black text-fuchsia-200">
          {status}
        </span>
      </div>
    </div>
  );
};

export default Participant;
