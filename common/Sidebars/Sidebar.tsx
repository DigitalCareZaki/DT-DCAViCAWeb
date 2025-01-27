'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';

import { useUser } from '@selectors';

import data from './constants';

import type { ClientComponentProps } from '@types';
import type { SidebarProps } from './types';

const Sidebar: ClientComponentProps<SidebarProps> = ({ renderKey }) => {
  const [user] = useUser();

  const [sidebar, setSidebar] = useState<boolean>(false);

  const getPath = useCallback(
    (url: string) => {
      if (!user.type) return '/';

      return `/${user.type?.toLowerCase()}${url}`;
    },
    [user.type]
  );

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
        width: sidebar ? '10%' : '5%',
      }}
      className="h-full w-[5%] py-6 pb-16"
    >
      <div
        className={twMerge(
          'theme-text-color flex h-full w-full flex-col items-center rounded-xl bg-white px-2 py-6',
          sidebar ? 'gap-6' : 'gap-4'
        )}
      >
        <div
          onClick={() => setSidebar((prev) => !prev)}
          className={'patient-profile-bar-icon cursor-pointer'}
        >
          <IoIosArrowForward
            size={24}
            className={twMerge(
              'transition duration-300',
              sidebar && 'rotate-180'
            )}
          />
        </div>
        {data[renderKey]?.map(({ Icon, ...el }) => (
          <div
            key={el.id}
            title={el.title}
            className={twMerge(
              'patient-profile-bar-icon',
              sidebar && 'flex w-full bg-background px-2',
            )}
          >
            <Link
              passHref
              href={getPath(el.path)}
              className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
            >
              <Icon size={24} />
              {sidebar && <span className="text-lg">{el.title}</span>}
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
