'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CsvLink from './CsvLink';
import PdfLink from './PdfLink';

import { ButtonPrimary } from '@common';

import type { ClientComponentProps } from '@types';
import type { ExportProps } from './types';

const Export: ClientComponentProps<ExportProps<Record<string, any>>> = (
  props
) => {
  const timeoutId = useRef<any>(null);
  const [hover, setHover] = useState<boolean>(false);

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
    <div className="relative w-40 z-50">
      <ButtonPrimary
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        title="Export"
        name="Export"
        className="h-12 rounded-lg text-lg lg:text-xl xl:text-2xl"
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
            className="absolute top-16 z-50 flex h-fit w-full flex-col gap-2 rounded-lg bg-white p-2 shadow-md"
          >
            <CsvLink {...props} />
            <PdfLink {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Export;
