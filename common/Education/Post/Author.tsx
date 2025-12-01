'use client';

import Image from 'next/image';

import type { ClientComponentProps } from '@types';
import type { AuthorProps } from './types';
import { getProfilePicture } from '@init-globals';

const Author: ClientComponentProps<AuthorProps> = ({ uri, name, specialty }) => {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative h-14 w-14 rounded-full">
        <Image
          src={getProfilePicture(uri)}
          alt="profile-picture"
          className="rounded-full object-cover"
          fill
        />
      </div>
      <div className="flex flex-col font-semibold">
        <span className="text-sm text-gray-500">{name}</span>
        <span className="text-xs font-normal text-gray-400">{specialty}</span>
      </div>
    </div>
  );
};

export default Author;
