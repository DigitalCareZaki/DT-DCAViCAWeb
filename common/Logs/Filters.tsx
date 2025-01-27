'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@selectors';

import { ButtonPrimary } from '@common';
import Link from 'next/link';

const HeaderFilter = () => {
  const timeoutId = useRef<any>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [user] = useUser();

  useEffect(() => { }, []);

  const onBlur = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      setHover(false);
    }, 500);
  };
  const onFocus = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setHover(true);
  };

  return (
    <div className="relative w-40 sm:w-48 lg:w-56">
      <ButtonPrimary
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        title="Filter"
        name="Filter"
        className="h-12 sm:h-14 lg:h-16 rounded-lg text-base sm:text-lg lg:text-xl"
        variant="icon"
        icon="IoMdAdd"
      />

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{
              opacity: 0,
              top: '30px',
            }}
            animate={{
              opacity: 1,
              top: '64px',
            }}
            exit={{
              top: '80px',
              opacity: 0,
            }}
            onMouseEnter={onFocus}
            onMouseLeave={onBlur}
            className="absolute top-16 z-10 flex h-[16rem] w-full flex-col gap-3 rounded-lg bg-white p-3 shadow-md"
          >
            <Link passHref href="?role=doctor">
              <div className="theme-bg-color flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm sm:text-base lg:text-lg font-semibold text-white transition duration-300 hover:shadow-lg">
                <span>Doctor</span>
              </div>
            </Link>
            <Link passHref href="?role=nurse">
              <div className="theme-bg-color flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm sm:text-base lg:text-lg font-semibold text-white transition duration-300 hover:shadow-lg">
                <span>Nurse</span>
              </div>
            </Link>
            <Link className="flex admin:hidden" passHref href="?role=patient">
              <div className="theme-bg-color flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm sm:text-base lg:text-lg font-semibold text-white transition duration-300 hover:shadow-lg">
                <span>Patient</span>
              </div>
            </Link>
            <Link passHref href="?role=admin">
              <div className="theme-bg-color flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm sm:text-base lg:text-lg font-semibold text-white transition duration-300 hover:shadow-lg">
                <span>Admin</span>
              </div>
            </Link>
            <Link passHref href="?role=all">
              <div className="theme-bg-color flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm sm:text-base lg:text-lg font-semibold text-white transition duration-300 hover:shadow-lg">
                <span>All</span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderFilter;
