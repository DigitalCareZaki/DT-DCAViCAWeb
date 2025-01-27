'use client';

import Image from 'next/image';

import { getProfilePicture, getName } from '@init-globals';

import type { ClientComponentProps } from '@types';

const User: ClientComponentProps<any> = ({
  uri,
  role,
  first_name,
  last_name,
  middle_name,
  email,
  handleSelect,
}) => {
  return (
    <div
      onClick={() => handleSelect(email)}
      className="flex h-fit w-full cursor-pointer items-center gap-2 rounded-lg bg-white p-4 text-xs transition duration-100 hover:bg-gray-200"
    >
      <div className="relative h-14 w-14 rounded-full">
        <Image
          src={getProfilePicture(uri)}
          className="h-full w-full rounded-full"
          fill
          alt={`${first_name} ${last_name}`}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-600">
          {getName({
            first_name,
            last_name,
            middle_name,
          })}
        </span>
        <span className="text-xs font-semibold text-gray-400">
          {role?.toLowerCase()}
        </span>
        <span className="text-[10px] font-semibold text-gray-400">{email}</span>
      </div>
    </div>
  );
};

export default User;
