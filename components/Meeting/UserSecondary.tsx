'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { BsSoundwave } from '@react-icons/all-files/bs/BsSoundwave';
import { GiPin } from '@react-icons/all-files/gi/GiPin';

import type { ClientComponentProps } from '@types';
import type { UserSecondaryProps } from './types';
import { useState } from 'react';

const UserSecondary: ClientComponentProps<UserSecondaryProps> = ({
  src,
  name,
  speaking,
  video,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={twMerge(
        'relative flex h-full w-60 cursor-pointer flex-col items-center justify-center rounded-lg border bg-dark-secondary',
        speaking ? 'theme-border-color' : 'border-transparent'
      )}
    >
      {video ? (
        <Image src={src} alt={name} fill className="rounded-lg object-cover" />
      ) : (
        <div className="relative h-20 w-20 rounded-full bg-dark-main">
          <Image
            src={src}
            alt={name}
            className="rounded-full object-cover p-2"
            fill
          />
        </div>
      )}
      <div className="absolute bottom-2 flex w-full items-center gap-2 px-2">
        <div className="theme-bg-color w-fit rounded-md p-2 text-ssx font-semibold text-white">
          <span>{name}</span>
        </div>
        {speaking && (
          <div className="theme-bg-color w-fit rounded-md p-2 text-ssx font-semibold text-white">
            <BsSoundwave size={16} />
          </div>
        )}
        <div
          className={twMerge(
            'theme-bg-color invisible w-fit rounded-md p-2 text-ssx font-semibold text-white transition duration-150 hover:scale-105 ',
            hover ? 'visible' : 'invisible'
          )}
        >
          <GiPin size={16} />
        </div>
      </div>
    </div>
  );
};

export default UserSecondary;
