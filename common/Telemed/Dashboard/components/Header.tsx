'use server';

import Image from 'next/image';

import { getProfilePicture } from '@init-globals';
import { getUser } from '@actions';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  const res = await getUser();

  return (
    <div className="mb-10 flex w-full items-center justify-between">
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-gray-600">
          Welcome, {res?.last_name}
        </span>
        <span className="text-xs font-semibold text-gray-400">
          {new Date().toDateString()}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 rounded-full">
          <Image
            src={getProfilePicture(res?.uri)}
            alt="profile-picture"
            fill
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600">
            {res?.first_name} {res?.last_name}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {res?.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
