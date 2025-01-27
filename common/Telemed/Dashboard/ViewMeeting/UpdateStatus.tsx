'use client';

import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';

import { updateMeetingStatus } from '@service';
import { showModalReducer } from '@slice';

import type { ClientComponentProps } from '@types';

const UpdateStatus: ClientComponentProps<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsHover(false);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleStatus =
    (
      status:
        | 'HOLD'
        | 'ACTIVE'
        | 'CANCELLED'
        | 'COMPLETED'
        | 'PENDING'
        | 'ONGOING'
    ) =>
    async () => {
      try {
        setIsHover(false);
        await updateMeetingStatus(status, id);

        dispatch(
          showModalReducer({
            show: true,
            message: 'Status Updated',
            type: 'SUCCESS',
          })
        );
      } catch (err) {
        dispatch(
          showModalReducer({
            show: true,
            message: 'Error at updating status',
            type: 'ERROR',
          })
        );
      }
    };

  return (
    <div className="relative flex flex-col gap-2">
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex h-fit w-fit cursor-pointer items-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100 transition duration-200 hover:bg-fuchsia-700 hover:text-fuchsia-200"
      >
        <span>Update Status</span>
        <FaEdit size={16} />
      </button>
      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 1,
              y: 20,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="flex h-fit w-full flex-col gap-2 rounded-lg bg-white/20 p-2 backdrop-blur-sm"
          >
            <div
              onClick={handleStatus('ACTIVE')}
              className="appointment-status-btn"
            >
              <span>Active</span>
            </div>
            <div
              onClick={handleStatus('HOLD')}
              className="appointment-status-btn"
            >
              <span>Hold</span>
            </div>
            <div
              onClick={handleStatus('CANCELLED')}
              className="appointment-status-btn"
            >
              <span>Cancelled</span>
            </div>
            <div
              onClick={handleStatus('ONGOING')}
              className="appointment-status-btn"
            >
              <span>Ongoing</span>
            </div>
            <div
              onClick={handleStatus('COMPLETED')}
              className="appointment-status-btn"
            >
              <span>Completed</span>
            </div>
            <div
              onClick={handleStatus('PENDING')}
              className="appointment-status-btn"
            >
              <span>Pending</span>
            </div>
          </motion.div>
        )}
        ƒ
      </AnimatePresence>
    </div>
  );
};

export default UpdateStatus;
