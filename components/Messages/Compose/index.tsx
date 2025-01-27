'use client';

import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './Header';
import Form from './Form';

import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { ClientComponent } from '@types';

const Compose: ClientComponent = () => {
  const {
    modals: { composeMessage },
  } = useSelector<ReduxProps, StoreGlobalState>((state) => state.global);

  return (
    <AnimatePresence>
      {composeMessage && (
        <div className="flex h-full w-full items-center justify-center pb-20 backdrop-blur-sm">
          <motion.div
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -50,
            }}
            transition={{
              type: 'keyframes',
            }}
            className="hidescrollbar z-[99999] ml-20 flex h-[90%] w-1/2 flex-col gap-4 overflow-y-scroll rounded-lg border bg-white p-5 shadow-2xl shadow-gray-600/20"
          >
            <Header />
            <Form />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Compose;
