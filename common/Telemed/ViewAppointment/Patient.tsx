'use server';

import Image from 'next/image';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Patient: ServerComponentProps<Props> = async ({
  imageURI,
  name,
  designation,
}) => {
  return (
    <div className="flex h-16 w-full items-center gap-2 rounded-lg bg-background px-2 py-4">
      <div className="relative h-11 w-11 rounded-lg">
        <Image
          src={imageURI}
          alt="profile-picture"
          className="rounded-lg bg-white object-cover"
          fill
        />
      </div>
      <div className="flex flex-col justify-between gap-2 py-2">
        <span className="text-xs font-semibold text-gray-600">{name}</span>
        <span className="text-ssx font-semibold text-gray-400">
          {designation}
        </span>
      </div>
    </div>
  );
};

export default Patient;
