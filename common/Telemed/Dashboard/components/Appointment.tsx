'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleSpinner } from 'react-spinners-kit';
import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical';

import { useUser } from '@selectors';
import { TooltipBasic } from '@common';
import { getProfilePicture, getName } from '@init-globals';
import { showModalReducer } from '@slice';
import { updateTelemedAction } from '@service';

import type { ClientComponentProps } from '@types';
import type { ModalState } from '@store-types';
import type { Appointment } from './types';

const colors = {
  '1': {
    primary: 'bg-fuchsia-200',
    secondary: 'bg-fuchsia-400',
    text: 'text-fuchsia-500',
    border: '#86198f',
  },
  '2': {
    primary: 'bg-amber-200',
    secondary: 'bg-amber-400',
    text: 'text-amber-500',
    border: '#86198f',
  },
  '3': {
    primary: 'bg-rose-200',
    secondary: 'bg-rose-400',
    text: 'text-rose-500',
    border: 'border-amber-800',
  },
  '4': {
    primary: 'bg-green-200',
    secondary: 'bg-green-400',
    text: 'text-green-500',
    border: 'border-rose-800',
  },
  '5': {
    primary: 'bg-blue-200',
    secondary: 'bg-blue-400',
    text: 'text-blue-500',
    border: 'border-green-800',
  },
  '6': {
    primary: 'bg-orange-200',
    secondary: 'bg-orange-400',
    text: 'text-orange-500',
    border: 'border-blue-800',
  },
};

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 6) + 1;
}

const Appointment: ClientComponentProps<Appointment> = ({
  className,
  dynamicWidth,
  status,
  appointment,
  id,
}) => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const [statusState, setStatusState] = useState<string>(status ?? '');
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [theme] = useState(
    // @ts-ignore
    colors[generateRandomNumber().toString()]
  );

  const { primary, secondary, text, border } = useMemo(() => theme, [theme]);

  const handleShowModal = useCallback(
    (props: ModalState) => {
      dispatch(showModalReducer({ ...props }));
    },
    [dispatch]
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleAccept = useCallback(
    async (props = 'ACTIVE') => {
      try {
        if (status !== 'PENDING') return;

        setLoading(true);

        const data = {
          id,
          status: props,
        };

        await updateTelemedAction(btoa(JSON.stringify(data)));

        handleShowModal({
          show: true,
          message: 'Accepted',
          type: 'SUCCESS',
        });
        setStatusState('ACTIVE');
      } catch (err: any) {
        handleShowModal({
          show: true,
          message: err?.message ?? 'Something went wrong',
          type: 'ERROR',
        });
      } finally {
        setLoading(false);
      }
    },
    [handleShowModal, id, status]
  );

  const handleToggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!status) return;

    setStatusState(status);
  }, [status]);


  return (
    <div
      className={twMerge(
        'flex h-[26rem] shrink-0 flex-col justify-between gap-4 rounded-lg p-4 font-semibold text-gray-600 transition duration-300',
        primary,
        className,
        dynamicWidth ? 'w-full hover:scale-[105%]' : 'w-80'
      )}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <div className="relative h-14 w-14 rounded-full">
            <Image
              src={getProfilePicture(appointment?.organizer.uri)}
              alt="profile picture"
              className="h-full w-full rounded-full"
              fill
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span>{getName({ ...(appointment?.organizer as any) })}</span>
              <div
                className={twMerge(
                  'h-fit w-fit rounded-lg bg-white/50 p-4 py-2 text-xs font-bold',
                  text
                )}
              >
                +{appointment?.participants.length}
              </div>
            </div>
            <span className="text-xs font-semibold opacity-50">
              {appointment?.organizer.role}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <TooltipBasic
            className={twMerge(
              'left-14 top-[1px] flex items-center justify-center shadow-md',
              primary,
              text
            )}
            title="Appointment about"
          >
            <div className="h-fit w-fit rounded-lg bg-white/50 p-4 py-2 text-xs font-bold">
              {appointment?.about}
            </div>
          </TooltipBasic>
          <TooltipBasic
            className={twMerge(
              'left-14 top-[1px] flex items-center justify-center shadow-md',
              primary,
              text
            )}
            title="Appointment type"
          >
            <div className="h-fit w-fit rounded-lg bg-white/50 p-4 py-2 text-xs font-bold">
              {appointment?.type}
            </div>
          </TooltipBasic>

          <TooltipBasic
            className={twMerge(
              'left-14 top-[1px] flex items-center justify-center shadow-md',
              primary,
              text
            )}
            title="Start Date"
          >
            <div className="h-fit w-fit rounded-lg bg-white/50 p-4 py-2 text-xs font-bold">
              {new Date(appointment?.start_date ?? Date()).toLocaleTimeString(
                'en-US',
                {
                  localeMatcher: 'best fit',
                  hour: 'numeric',
                  minute: 'numeric',
                  day: 'numeric',
                  month: 'short',
                  // dateStyle: 'short',
                }
              )}
            </div>
          </TooltipBasic>
          <TooltipBasic
            className={twMerge(
              'left-14 top-[1px] flex items-center justify-center shadow-md',
              primary,
              text
            )}
            title="Created Date"
          >
            <div className="h-fit w-fit rounded-lg bg-white/50 p-4 py-2 text-xs font-bold">
              {new Date(appointment?.created_at ?? Date()).toLocaleTimeString(
                'en-US',
                {
                  localeMatcher: 'best fit',
                  hour: 'numeric',
                  minute: 'numeric',
                  day: 'numeric',
                  month: 'short',
                  // dateStyle: 'short',
                }
              )}
            </div>
          </TooltipBasic>
          <TooltipBasic
            className={twMerge(
              'left-14 top-[1px] flex items-center justify-center shadow-md',
              primary,
              text
            )}
            title="End Date"
          >
            <div className="h-fit w-fit rounded-lg bg-white/50 p-4 py-2 text-xs font-bold">
              {new Date(appointment?.end_date ?? Date()).toLocaleTimeString(
                'en-US',
                {
                  localeMatcher: 'best fit',
                  hour: 'numeric',
                  minute: 'numeric',
                  day: 'numeric',
                  month: 'short',
                  // dateStyle: 'short',
                }
              )}
            </div>
          </TooltipBasic>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className={twMerge('text-lg', text)}>{appointment?.title}</span>
        <span className="truncate text-xs opacity-80">
          {appointment?.description}
        </span>
      </div>
      <div className="flex w-full items-center gap-2">
        <button
          className={twMerge(
            'flex h-11 w-[90%] cursor-pointer items-center justify-center rounded-lg p-4 py-3 text-sm text-white outline-none duration-300',
            statusState === 'PENDING' ? secondary : `${secondary} opacity-50`,
            statusState === 'PENDING' && 'hover:shadow-xl',
            user.role === 'PATIENT' && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => handleAccept('ACTIVE')}
          disabled={user.role === 'PATIENT'}
        >
          {loading ? (
            showOptions ? (
              <></>
            ) : (
              <CircleSpinner size={20} color="#fff" />
            )
          ) : statusState === 'PENDING' ? (
            'Accept'
          ) : (
            statusState &&
            statusState[0].toUpperCase() + statusState.slice(1).toLowerCase()
          )}
        </button>
        <button
          onClick={handleToggleOptions}
          className={twMerge(
            'flex h-11 w-[20%] cursor-pointer items-center justify-center rounded-lg p-4 py-3 text-sm text-white outline-none duration-300 hover:shadow-xl',
            secondary
          )}
        >
          <HiDotsVertical />
        </button>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{
                opacity: 0,
                bottom: -250,
              }}
              animate={{
                opacity: 1,
                bottom: -210,
              }}
              exit={{
                opacity: 0,
              }}
              className={twMerge(
                'hidescrollbar absolute -bottom-48 z-30 flex h-60 w-56 flex-col gap-2 overflow-y-scroll rounded-lg border bg-white p-4 text-xs font-bold shadow-2xl shadow-black/50'
              )}
            >
              <div
                className={twMerge(
                  'flex h-11 w-full shrink-0 cursor-pointer items-center rounded-lg bg-gray-200 px-4 text-gray-500 hover:bg-gray-300'
                )}
                onClick={() => handleAccept('HOLD')}
              >
                {loading ? (
                  <CircleSpinner size={20} color="#000000" />
                ) : (
                  <span>HOLD</span>
                )}
              </div>
              <div
                onClick={() => handleAccept('CANCELLED')}
                className="flex h-11 w-full shrink-0 cursor-pointer items-center rounded-lg bg-gray-200 px-4 text-gray-500 hover:bg-gray-300"
              >
                <span>CANCELLED </span>
              </div>
              <div
                onClick={() => handleAccept('ONGOING')}
                className="flex h-11 w-full shrink-0 cursor-pointer items-center rounded-lg bg-gray-200 px-4 text-gray-500 hover:bg-gray-300"
              >
                <span>ONGOING</span>
              </div>
              <div
                onClick={() => handleAccept('ACTIVE')}
                className="flex h-11 w-full shrink-0 cursor-pointer items-center rounded-lg bg-gray-200 px-4 text-gray-500 hover:bg-gray-300"
              >
                <span>ACTIVE</span>
              </div>
              <div
                onClick={() => handleAccept('PENDING')}
                className="flex h-11 w-full shrink-0 cursor-pointer items-center rounded-lg bg-gray-200 px-4 text-gray-500 hover:bg-gray-300"
              >
                <span>PENDING</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full items-center">
        <Link
          passHref
          href={`/${user.role?.toLowerCase()}/telemed/meetings/view/${appointment?.id}`}
          className="w-full"
        >
          <button
            className={twMerge(
              'flex h-11 w-full cursor-pointer items-center justify-center rounded-lg p-4 py-3 text-sm text-white outline-none duration-300 hover:shadow-xl',
              secondary
            )}
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Appointment;
