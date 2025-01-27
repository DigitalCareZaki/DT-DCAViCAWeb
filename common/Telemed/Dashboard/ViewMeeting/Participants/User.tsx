import Image from 'next/image';

import { getProfilePicture, getName } from '@init-globals';

import type { ServerComponentProps } from '@types';
import { twMerge } from 'tailwind-merge';

const User: ServerComponentProps<any> = async ({ user, status }) => (
  <div
    className={twMerge(
      'group flex w-full items-center gap-2 rounded-lg p-2 transition duration-200',
      status === 'ACTIVE'
        ? 'bg-fuchsia-100 hover:bg-fuchsia-600'
        : 'bg-yellow-100 hover:bg-yellow-600'
    )}
  >
    <div className="relative h-10 w-10 shrink-0 rounded-full bg-white">
      <Image
        src={getProfilePicture(user?.uri)}
        alt="profile-picture"
        fill
        className="h-full w-full rounded-full"
      />
    </div>
    <div className="flex w-full flex-col">
      <span
        className={twMerge(
          'text-xs font-bold transition duration-200 group-hover:text-white',
          status === 'ACTIVE' ? 'text-fuchsia-600' : 'text-yellow-600'
        )}
      >
        {getName({ ...user })}
      </span>
      <div className="flex w-full items-center justify-between">
        <span
          className={twMerge(
            'text-[10px] font-bold uppercase transition duration-200 group-hover:text-white',
            status === 'ACTIVE' ? 'text-fuchsia-600' : 'text-yellow-600'
          )}
        >
          {user?.role}
        </span>
        <span
          className={twMerge(
            'text-[10px] font-bold uppercase transition duration-200 group-hover:text-white',
            status === 'ACTIVE' ? 'text-fuchsia-600' : 'text-yellow-600'
          )}
        >
          {status}
        </span>
      </div>
    </div>
  </div>
);

export default User;
