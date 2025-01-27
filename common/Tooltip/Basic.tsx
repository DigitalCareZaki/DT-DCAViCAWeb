'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import type { TooltipProps } from './types';
import type { ClientComponentProps } from '@types';

const Basic: ClientComponentProps<TooltipProps> = ({
  title,
  children,
  style,
  className,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-fit"
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: 'keyframes',
            }}
            className={twMerge(
              'absolute left-10 z-[999] w-fit rounded-lg bg-t-color-secondary px-4 py-2 text-ssx font-semibold text-white',
              className
            )}
            style={style}
          >
            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-ssx">
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default Basic;
