'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';

import { useUser } from '@selectors';

import data from './constants';

import type { ClientComponentProps } from '@types';
import type { SidebarProps } from './types';

const Sidebar: ClientComponentProps<SidebarProps> = ({ renderKey }) => {
  const [user] = useUser();
  const [sidebar, setSidebar] = useState<boolean>(false);
  const pathname = usePathname();

  const getPath = useCallback(
    (url: string) => {
      if (!user.type) return '/';
      return `/${user.type?.toLowerCase()}${url}`;
    },
    [user.type]
  );

  const handleToggle = () => {
    setSidebar((prev) => !prev);
  };

  const isActive = (path: string) => {
    const fullPath = getPath(path);
    return pathname === fullPath;
  };

  return (
    <div className="relative h-full flex-shrink-0">
      <motion.div
        initial={{ width: '80px' }}
        animate={{
          width: sidebar ? '240px' : '80px',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        className="h-full py-6 pb-16 overflow-hidden"
      >
        <div
          className={twMerge(
            'flex h-full w-full flex-col rounded-xl bg-white shadow-lg border border-gray-200',
            'transition-all duration-300 ease-in-out',
            sidebar ? 'px-4 py-6 gap-3' : 'px-2 py-6 gap-4'
          )}
        >
          {/* Toggle Button */}
          <div
            onClick={handleToggle}
            className={twMerge(
              'cursor-pointer flex items-center justify-center',
              'hover:bg-indigo-50 rounded-lg transition-colors duration-200',
              'p-3 mb-2 border border-transparent hover:border-indigo-200',
              sidebar && 'justify-start px-3'
            )}
            title={sidebar ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <motion.div
              animate={{
                rotate: sidebar ? 180 : 0,
                scale: sidebar ? 1.1 : 1
              }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }}
              className="flex items-center justify-center"
            >
              <IoIosArrowForward
                size={20}
                className="text-indigo-600 hover:text-indigo-700"
              />
            </motion.div>

            <AnimatePresence>
              {sidebar && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="ml-3 text-sm font-semibold text-indigo-700"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-2 flex-1">
            {data[renderKey]?.map(({ Icon, ...el }) => {
              const active = isActive(el.path);

              return (
                <div
                  key={el.id}
                  className={twMerge(
                    'relative group',
                    !sidebar && 'flex items-center justify-center'
                  )}
                >
                  <Link
                    passHref
                    href={getPath(el.path)}
                    className={twMerge(
                      'flex items-center rounded-lg transition-all duration-200',
                      'active:scale-95 group border border-transparent',
                      active
                        ? 'bg-indigo-100 border-indigo-200 shadow-sm'
                        : 'hover:bg-indigo-50 hover:border-indigo-100',
                      sidebar
                        ? 'w-full px-3 py-2.5 gap-3'
                        : 'p-3 justify-center'
                    )}
                    title={!sidebar ? el.title : undefined}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <Icon
                        size={sidebar ? 20 : 24}
                        className={twMerge(
                          'transition-colors duration-200',
                          active
                            ? 'text-indigo-700'
                            : 'text-gray-600 group-hover:text-indigo-600'
                        )}
                      />
                    </div>

                    <AnimatePresence>
                      {sidebar && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: 0.05 }}
                          className={twMerge(
                            'text-sm font-medium whitespace-nowrap transition-colors duration-200',
                            active
                              ? 'text-indigo-800 font-semibold'
                              : 'text-gray-700 group-hover:text-indigo-700'
                          )}
                        >
                          {el.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {!sidebar && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {el.title}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}

                  {/* Active indicator for collapsed state */}
                  {!sidebar && active && (
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;