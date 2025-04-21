'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { BiHappy as BiSolidHappy } from '@react-icons/all-files/bi/BiHappy';
import { ImSad2 as TbMoodSadDizzy } from '@react-icons/all-files/im/ImSad2';

import { showModalReducer } from '@slice';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState, ModalState } from '@store-types';

const ModalBottom: ClientComponent = () => {
  const { bottomModal: modal } = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const dispatch = useDispatch();

  const handleModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  useEffect(() => {
    if (!modal.show) return;

    let timeoutid: any | undefined = undefined;

    timeoutid = setTimeout(() => {
      handleModal({ type: undefined, show: false, message: undefined });
    }, 6000);

    return () => {
      clearTimeout(timeoutid);
    };
  }, [modal.show]);

  const RenderIcon = {
    SUCCESS: <BiSolidHappy size={20} />,
    ERROR: <TbMoodSadDizzy size={20} />,
  };

  return (
    <AnimatePresence>
      {modal.show && (
        <motion.div
          initial={{
            opacity: 50,
            bottom: -50,
          }}
          animate={{
            opacity: 100,
            bottom: 40,
          }}
          exit={{
            opacity: 0,
            bottom: -50,
          }}
          className={twMerge(
            'absolute bottom-10 left-[45%] z-[9999999] flex w-80 items-center justify-center gap-2 rounded-full px-10 py-3 text-xs font-bold shadow-xl backdrop-blur-sm',
            modal.type === 'ERROR' &&
            'bg-rose-500/50 text-rose-900 shadow-rose-500/30',
            modal.type === 'SUCCESS' &&
            'bg-emerald-500/50 text-emerald-900 shadow-emerald-500/30'
          )}
        >
          {RenderIcon[modal.type as 'SUCCESS']}
          <span className="max-w-60 truncate">{modal.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalBottom;
