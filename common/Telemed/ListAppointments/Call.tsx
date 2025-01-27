'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import { FaPhone as HiOutlinePhoneMissedCall } from '@react-icons/all-files/fa/FaPhone';
import { IoCamera } from '@react-icons/all-files/io5/IoCamera';
import { BiMicrophone } from '@react-icons/all-files/bi/BiMicrophone';

import { toggleDoctorAppointmentReducer } from '@slice';
import { useUser } from '@selectors';

import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { ClientComponent } from '@types';

const Call: ClientComponent = () => {
  const router = useRouter();
  const [userType] = useUser();

  const [callingState, setCallingState] = useState<
    'ringing' | 'cancelled' | 'connected' | 'calling'
  >('calling');

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const handleEndCall = () => dispatch(toggleDoctorAppointmentReducer());

  const handleRinging = () => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve('ringing');
        }, 2000);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleConnected = () => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve('connected');
        }, 2000);
      } catch (err) {
        reject(err);
      }
    });
  };

  useEffect(() => {
    if (!global.modals.doctorAppointmentCall) return;

    (async () => {
      await handleRinging();
      setCallingState('ringing');
      await handleConnected();
      router.push(`/${userType.type?.toLowerCase()}/telemed/appointment/2`);
    })();
  }, [router, global.modals.doctorAppointmentCall, userType.type]);

  return (
    <AnimatePresence>
      {global.modals.doctorAppointmentCall && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/10">
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: 'keyframes',
              duration: 0.3,
            }}
            exit={{
              opacity: 0,
              y: 100,
            }}
            className="flex h-[30rem] w-[30rem] flex-col items-center justify-between rounded-2xl bg-white pb-10 pt-20 shadow-xl"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-28 w-28 rounded-full bg-black">
                <Image
                  src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708387200&semt=ais"
                  alt="profile-picture"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="screen-title font-semibold normal-case">
                Syed Azeem Javed
              </span>
              <span className="text-xs text-gray-400">{callingState}...</span>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <div className="theme-bg-color flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition duration-300 hover:shadow-xl">
                <BiMicrophone size={18} />
              </div>
              <div className="theme-bg-color flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition duration-300 hover:shadow-xl">
                <IoCamera size={18} />
              </div>
              <div
                onClick={handleEndCall}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-rose-500 text-white transition duration-300 hover:shadow-xl"
              >
                <HiOutlinePhoneMissedCall size={18} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Call;
