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
    <div className="relative z-50 w-40">
      <ButtonPrimary
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        title="Filter"
        name="Filter"
        className="h-10 rounded-lg text-lg lg:text-xl xl:text-2xl"
        variant="icon"
        icon="IoMdAdd"
      />

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{
              opacity: 0,
              top: '36px',
            }}
            animate={{
              opacity: 1,
              top: '48px',
            }}
            exit={{
              top: '56px',
              opacity: 0,
            }}
            onMouseEnter={onFocus}
            onMouseLeave={onBlur}
            className="absolute right-0 z-50 flex h-fit w-full flex-col gap-2 rounded-lg bg-white p-2 shadow-md"
          >
            <Link
              passHref
              href={`/${user.role?.toLowerCase()}/users?role=doctor`}
            >
              <div className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg">
                <span className='text-lg lg:text-xl xl:text-2xl'>Doctor</span>
              </div>
            </Link>
            <Link
              passHref
              href={`/${user.role?.toLowerCase()}/users?role=nurse`}
            >
              <div className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg">
                <span className='text-lg lg:text-xl xl:text-2xl'>Nurse</span>
              </div>
            </Link>
            <Link passHref href={`/${user.role?.toLowerCase()}/users?role=patient`}>
              <div className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg">
                <span className='text-lg lg:text-xl xl:text-2xl'>Patient</span>
              </div>
            </Link>
            <Link
              passHref
              href={`/${user.role?.toLowerCase()}/users?role=admin`}
            >
              <div className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg">
                <span className='text-lg lg:text-xl xl:text-2xl'>Admin</span>
              </div>
            </Link>
            <Link passHref href={`/${user.role?.toLowerCase()}/users?role=all`}>
              <div className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg">
                <span className='text-lg lg:text-xl xl:text-2xl'>All</span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderFilter;
