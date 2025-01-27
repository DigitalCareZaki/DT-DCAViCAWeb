'use client';

import { createPortal } from 'react-dom';

import { ButtonPrimary } from '@common';
import { AnimatePresence, motion } from 'framer-motion';

import type { ClientComponentProps, EmailTemplatesProps } from '@types';

const ViewTemplate: ClientComponentProps<
  EmailTemplatesProps & {
    show: boolean;
    customkey: string;
    handleClose: () => void;
  }
> = ({ subject, key, id, html, show, customkey, handleClose }) => {
  if (!show) return <></>;

  return (
    // <AnimatePresence key={customkey}>
    <>
      {createPortal(
        <div
          id="view-template"
          className="fixed top-0 z-[9999999] flex h-screen w-screen items-center justify-center bg-black/50"
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-fit w-[30%] flex-col gap-4 rounded-2xl bg-white p-6"
            >
              <div className="flex flex-col text-gray-600">
                <span className="text-sm font-semibold">Subject</span>
                <span className="text-xs font-semibold text-gray-400">
                  {subject}
                </span>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="rounded-2xl"
              />
              <ButtonPrimary name="Close" onClick={handleClose} />
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </>

    // </AnimatePresence>
  );
};

export default ViewTemplate;
