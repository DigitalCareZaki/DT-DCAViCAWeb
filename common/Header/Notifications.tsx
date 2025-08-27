'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { IoNotifications } from '@react-icons/all-files/io5/IoNotifications';

import { getName, getProfilePicture, timeAgo } from '@init-globals';
import { ClientGenerator } from '@common';

import type { ClientComponent, ClientComponentProps } from '@types';
import type { ReduxProps, StoreNotificationProps } from '@store-types';

const Notifications: ClientComponent = () => {
  const { notifications, unread } = useSelector<
    ReduxProps,
    StoreNotificationProps
  >((state) => state.notifications);

  // Debug logging
  // console.log('Notifications data:', notifications);
  // console.log('Unread status:', unread);

  const timeoutRef = useRef<any | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleHide = () => setShow(false);

  useEffect(() => {
    document.addEventListener('click', handleHide);

    return () => {
      document.removeEventListener('click', handleHide);
    };
  }, []);

  const handleOnFocus = () => setShow(true);
  const handleOnBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 400);
  };

  return (
    <>
      <div
        onMouseEnter={handleOnFocus}
        onMouseLeave={handleOnBlur}
        className={
          'theme-bg-color relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition duration-200 hover:scale-[105%]'
        }
      >
        {(unread || notifications.filter(n => !n?.read).length > 0) && (
          <div className="theme-bg-color absolute z-20 h-full w-full animate-ping rounded-full" />
        )}
        <IoNotifications />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            onMouseEnter={handleOnFocus}
            onMouseLeave={handleOnBlur}
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 20,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              type: 'keyframes',
              duration: 0.2,
            }}
            className="absolute top-full right-0 z-50 flex h-96 w-80 flex-col gap-2 overflow-y-auto rounded-lg bg-white p-4 text-xs shadow-lg shadow-black/50 border border-gray-200"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              {unread && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.filter(n => !n?.read).length} new
                </span>
              )}
            </div>

            {notifications.length > 0 ? (
              <div className="space-y-3">
                <ClientGenerator data={notifications}>
                  <IndividalNotification />
                </ClientGenerator>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-gray-400 mb-2">
                  <IoNotifications size={32} />
                </div>
                <p className="text-gray-500 text-sm">
                  No notifications yet
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  You're all caught up!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const IndividalNotification: ClientComponentProps<any> = ({ ...el }) => {
  return (
    <div className="flex w-full items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100">
      <div className="relative h-10 w-10 shrink-0 rounded-full bg-gray-200">
        <Image
          src={getProfilePicture(el?.sender?.uri)}
          alt="profile"
          className="h-full w-full rounded-full object-cover"
          fill
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {getName({
                  ...el?.sender,
                })}
              </span>
              {!el?.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
              {el?.title}
            </p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {el?.description}
            </p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {timeAgo(new Date(el?.created_at).getTime())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
