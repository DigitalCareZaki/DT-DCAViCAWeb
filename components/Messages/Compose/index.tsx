'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './Header';
import Form from './Form';
import { Icon } from '@common';
import { toggleComposeMessageReducer, composeEmailReducer } from '@slice';

import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { FC } from 'react';

interface ComposeProps {
  inline?: boolean;
}

const Compose: FC<ComposeProps> = ({ inline = false }) => {
  const dispatch = useDispatch();
  const {
    modals: { composeMessage },
    composeMessage: composeState,
  } = useSelector<ReduxProps, StoreGlobalState>((state) => state.global);

  const handleCloseInline = () => {
    dispatch(composeEmailReducer({ to: '', subject: '', parent_id: '' }));
    dispatch(toggleComposeMessageReducer());
  };

  if (inline) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full rounded-2xl border border-gray-300 bg-white shadow-2xl p-0 overflow-hidden"
        style={{ boxShadow: '0 4px 24px 0 rgba(60,64,67,.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
          <span className="text-sm font-semibold text-gray-700">Reply</span>
          <button
            onClick={handleCloseInline}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 transition"
            title="Close reply"
            type="button"
          >
            <Icon name="IoClose" size={18} />
          </button>
        </div>
        <div className="p-4">
          <Form inline />
        </div>
      </motion.div>
    );
  }

  // Only show modal if not replying (parent_id is empty)
  const isReplying = !!composeState.parent_id;
  if (isReplying) return null;

  return (
    <AnimatePresence>
      {composeMessage && (
        <div className="flex h-full w-full items-center justify-center pb-20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'keyframes' }}
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
