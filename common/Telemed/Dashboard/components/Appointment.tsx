'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  DOCTOR: {
    primary: 'bg-blue-100',
    secondary: 'bg-blue-600',
    text: 'text-blue-700',
    border: 'border-blue-800',
    ring: 'ring-blue-600',
  },
  NURSE: {
    primary: 'bg-green-100',
    secondary: 'bg-green-600',
    text: 'text-green-700',
    border: 'border-green-800',
    ring: 'ring-green-600',
  },
  PATIENT: {
    primary: 'bg-teal-100',
    secondary: 'bg-teal-600',
    text: 'text-teal-700',
    border: 'border-teal-800',
    ring: 'ring-teal-600',
  },
  DEFAULT: {
    primary: 'bg-gray-100',
    secondary: 'bg-gray-400',
    text: 'text-gray-700',
    border: 'border-gray-800',
    ring: 'ring-gray-400',
  },
};

const Appointment: ClientComponentProps<Appointment> = ({
  className,
  dynamicWidth,
  status,
  appointment,
  id,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user] = useUser();

  const [statusState, setStatusState] = useState<string>(status ?? '');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const optionsButtonRef = useRef<HTMLButtonElement | null>(null);

  // Assign color based on organizer role
  const role = typeof appointment?.organizer?.role === 'string' ? appointment.organizer.role.toUpperCase() : 'DEFAULT';
  const theme = colors[role as keyof typeof colors] || colors.DEFAULT;

  const { primary, secondary, text, border, ring } = useMemo(() => theme, [theme]);


  const handleShowModal = useCallback(
    (props: ModalState) => {
      dispatch(showModalReducer({ ...props }));
    },
    [dispatch]
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleAccept = useCallback(
    async (props = 'ACTIVE', redirectToMeetings = false, redirectToView = false) => {
      try {
        if (user.role !== 'DOCTOR' || !appointment || !id) return;

        setLoading(true);

        const data = {
          id: appointment.id,
          status: props,
        };

        const res = await updateTelemedAction(btoa(JSON.stringify(data)));
        if (!res.success) throw new Error(res.message ?? 'Something went wrong');

        handleShowModal({
          show: true,
          message: `Status updated to ${props}`,
          type: 'SUCCESS',
        });
        setStatusState(props);
        setShowOptions(false);
        if (redirectToView) {
          router.push(`/${user.role.toLowerCase()}/telemed/meetings/view/${appointment.id}`);
        } else if (redirectToMeetings) {
          router.replace(`/${user.role.toLowerCase()}/telemed/meetings`);
        }
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
    [handleShowModal, appointment, router, user.role, id]
  );

  const handleToggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!status) return;

    setStatusState(status);
  }, [status]);

  useEffect(() => {
    if (!showOptions) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        optionsRef.current &&
        !optionsRef.current.contains(target) &&
        optionsButtonRef.current &&
        !optionsButtonRef.current.contains(target)
      ) {
        setShowOptions(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowOptions(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showOptions]);


  return (
    <div
      className={twMerge(
        'flex min-h-[26rem] h-auto shrink-0 flex-col justify-between gap-4 rounded-lg p-4 font-semibold text-gray-600 transition duration-300',
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
        <span className={twMerge('text-lg break-words', text)}>{appointment?.title}</span>
        <span className="truncate text-xs opacity-80">
          {appointment?.description}
        </span>
      </div>
      <div className="relative flex w-full items-center gap-2">
        <button
          className={twMerge(
            'flex h-11 w-[90%] cursor-pointer items-center justify-center rounded-lg p-4 py-3 text-sm text-white outline-none duration-300',
            statusState === 'PENDING' ? secondary : `${secondary} opacity-50`,
            statusState === 'PENDING' && 'hover:shadow-xl',
            user.role !== 'DOCTOR' && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => statusState === 'PENDING' && handleAccept('ACTIVE', false, true)}
          disabled={user.role !== 'DOCTOR'}
        >
          {loading ? (
            showOptions ? (
              <></>
            ) : (
              <CircleSpinner size={20} color="#fff" />
            )
          ) : statusState === 'PENDING' && user.role === 'DOCTOR' ? (
            'Accept'
          ) : (
            statusState &&
            statusState[0].toUpperCase() + statusState.slice(1).toLowerCase()
          )}
        </button>
        <button
          ref={optionsButtonRef}
          onClick={handleToggleOptions}
          className={twMerge(
            'flex h-11 w-[20%] cursor-pointer items-center justify-center rounded-lg p-4 py-3 text-sm text-white outline-none duration-300 hover:shadow-xl focus-visible:outline-none focus:ring-2 focus:ring-offset-2',
            secondary,
            ring,
            user.role !== 'DOCTOR' && 'opacity-50 cursor-not-allowed'
          )}
          disabled={user.role !== 'DOCTOR'}
        >
          <HiDotsVertical />
        </button>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              ref={optionsRef}
              role="menu"
              aria-label="Appointment status options"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              className={twMerge(
                'absolute right-0 -bottom-2 z-30 w-56 rounded-xl border bg-white p-2 text-sm font-semibold shadow-xl backdrop-blur-md',
                border,
                text,
                primary
              )}
            >
              {['HOLD', 'CANCELLED', 'ONGOING', 'ACTIVE', 'PENDING'].map((opt) => (
                <button
                  key={opt}
                  role="menuitem"
                  onClick={() => handleAccept(opt as any, true)}
                  className={twMerge(
                    'flex h-10 w-full items-center justify-between rounded-lg px-3 transition-colors hover:bg-black/5 focus:bg-black/5 focus:outline-none',
                    text,
                    statusState === opt && 'bg-black/5'
                  )}
                >
                  <span>{opt}</span>
                  {loading && statusState === opt ? (
                    <CircleSpinner size={18} color="#4b5563" />
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider opacity-50">{opt === statusState ? 'Current' : ''}</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full items-center">
        {statusState === 'ACTIVE' ? (
          <button
            className={twMerge(
              'flex h-11 w-full cursor-not-allowed items-center justify-center rounded-lg p-4 py-3 text-sm text-white opacity-50 outline-none',
              secondary
            )}
            disabled
          >
            View
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Appointment;
