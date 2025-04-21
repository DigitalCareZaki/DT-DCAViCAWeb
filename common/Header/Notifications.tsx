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
        {unread && (
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
            className="absolute top-full z-50 flex h-96 w-full flex-col gap-4 overflow-y-scroll rounded-lg bg-white p-2 text-xs shadow-lg shadow-black/50"
          >
            {notifications.length > 0 ? (
              <ClientGenerator data={notifications}>
                <IndividalNotification />
              </ClientGenerator>
            ) : (
              <p className="my-auto w-full text-center text-md">
                🥳 Hooray! You have no notifications...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const IndividalNotification: ClientComponentProps<any> = ({ ...el }) => {
  return (
    <div className="theme-bg-color flex w-full items-start gap-2 overflow-x-hidden rounded-2xl p-4">
      <div className="relative h-10 w-10 shrink-0 rounded-full">
        <Image
          src={getProfilePicture(el?.sender?.uri)}
          alt="profile"
          className="h-full w-full rounded-full object-cover"
          fill
        />
      </div>
      <div className="flex flex-col text-white">
        <span className="text-sm text-xs font-semibold">
          {getName({
            ...el?.sender,
          })}
        </span>
        <span className="-mt-1 line-clamp-1 w-[80%] truncate text-sm text-xs font-semibold text-white/50">
          {el?.sender?.email}
        </span>
        <span className="text-sm text-xs font-semibold">{el?.title}</span>
        <span className="-mt-1 w-[80%] text-[10px] text-white/60">
          {el?.description}
        </span>
        <div className="flex w-[80%] justify-end">
          <span className="-mt-1 text-[10px] font-semibold text-white/80">
            {timeAgo(new Date(el?.created_at).getTime())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
