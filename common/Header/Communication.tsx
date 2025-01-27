'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@selectors';

import type { ClientComponent } from '@types';
import { AnimatePresence, motion } from 'framer-motion';

const Communication: ClientComponent = () => {
  const [user] = useUser();
  const [show, setShow] = useState<boolean>(false);

  const getPath = useCallback(
    (uri: string) => {
      return `/${user?.type?.toLowerCase() ?? ''}${uri}`;
    },
    [user?.type]
  );

  const handleToggle = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <div className="relative flex flex-col">
      <span onClick={handleToggle} className="text-link-primary">
        Communication
      </span>
      <AnimatePresence mode="wait" key={show ? '1' : '0'}>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              type: 'keyframes',
              duration: 0.2,
            }}
            onClick={handleToggle}
            className="absolute -right-[40%] top-12 z-[9999] flex h-32 w-[200%] flex-col gap-2 rounded-lg border bg-white p-4 uppercase shadow-md"
          >
            <Link passHref href={getPath('/messages')}>
              <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-gray-100 p-2 text-xs font-semibold text-gray-600 hover:bg-gray-200">
                <span>Mail</span>
              </div>
            </Link>
            <Link passHref href={getPath('/chat')}>
              <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-gray-100 p-2 text-xs font-semibold text-gray-600 hover:bg-gray-200">
                <span>Chat</span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Communication;
