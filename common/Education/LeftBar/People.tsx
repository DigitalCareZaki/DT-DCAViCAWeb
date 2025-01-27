'use client';

import Image from 'next/image';

import type { ClientComponentProps } from '@types';
import type { PeopleProps } from './types';

const Content: ClientComponentProps<PeopleProps> = ({
  src,
  department,
  name,
}) => {
  return (
    <div className="flex h-16 w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-white px-1 transition">
      <div className="flex items-center gap-2">
        <div className="relative h-16 w-16 shrink-0 rounded-full">
          <Image
            src={src}
            alt="trending"
            className="rounded-full object-cover"
            fill
          />
        </div>
        <div className="flex h-full flex-col py-2 text-ssx font-medium">
          <span className="font-semibold text-gray-500">{name}</span>
          <span className="font-medium text-gray-500">{department}</span>
        </div>
      </div>
    </div>
  );
};

export default Content;
