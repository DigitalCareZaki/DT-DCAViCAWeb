'use server';

import Image from 'next/image';

import { getUser } from '@actions';
import { getProfilePicture, getName } from '@init-globals';

import type { ServerComponent } from '@types';

const Topbar: ServerComponent = async () => {
  const user = await getUser();

  if (!user) return <></>;

  return (
    <div className="flex w-full gap-2">
      <div className="relative h-12 w-12 rounded-full p-1">
        <Image
          src={getProfilePicture(user.uri)}
          alt="Profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="theme-text-color flex flex-col py-2 text-xs font-semibold">
        <span>
          {getName({
            first_name: user.first_name ?? '',
            last_name: user.last_name ?? '',
            middle_name: user.middle_name,
          })}
        </span>
        <span className="text-ssx text-gray-main">{user.role}</span>
      </div>
    </div>
  );
};

export default Topbar;