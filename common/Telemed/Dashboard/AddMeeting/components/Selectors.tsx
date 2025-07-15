'use client';

import { getName } from '@init-globals';
import { AnimatePresence, motion } from 'framer-motion';

import { IoClose } from '@react-icons/all-files/io5/IoClose';

import type { ClientComponentProps, SearchTelemedResProps } from '@types';
import { useState } from 'react';

export const TypeSelector: ClientComponentProps<Props> = ({ handleSelect }) => {
  return (
    <>
      <div
        onClick={() => handleSelect('type', 'ONLINE')}
        className="flex h-10 w-full cursor-pointer items-center rounded-lg px-4 text-lg font-semibold bg-white text-teal-900 transition duration-200 hover:bg-teal-100 hover:text-teal-900 active:bg-teal-200"
      >
        <span>ONLINE</span>
      </div>
      <div
        onClick={() => handleSelect('type', 'OFFLINE')}
        className="flex h-10 w-full cursor-pointer items-center rounded-lg px-4 text-lg font-semibold bg-white text-teal-900 transition duration-200 hover:bg-teal-100 hover:text-teal-900 active:bg-teal-200"
      >
        <span>OFFLINE</span>
      </div>
    </>
  );
};

export const StatusSelector: ClientComponentProps<Props> = ({
  handleSelect,
}) => {
  return (
    <>
      <div
        onClick={() => handleSelect('status', 'ACTIVE')}
        className="appointment-type-selector"
      >
        <span>ACTIVE</span>
      </div>
      <div
        onClick={() => handleSelect('status', 'HOLD')}
        className="appointment-type-selector"
      >
        <span>HOLD</span>
      </div>
      <div
        onClick={() => handleSelect('status', 'CANCELLED')}
        className="appointment-type-selector"
      >
        <span>CANCELLED</span>
      </div>
      <div
        onClick={() => handleSelect('status', 'ONGOING')}
        className="appointment-type-selector"
      >
        <span>ONGOING</span>
      </div>
      <div
        onClick={() => handleSelect('status', 'COMPLETED')}
        className="appointment-type-selector"
      >
        <span>COMPLETED</span>
      </div>
    </>
  );
};

export const AboutSelector: ClientComponentProps<Props> = ({
  handleSelect,
}) => {
  return (
    <>
      <div
        onClick={() => handleSelect('about', 'EMERGENCY')}
        className="flex h-10 w-full cursor-pointer items-center rounded-lg px-4 text-lg font-semibold bg-white text-teal-900 transition duration-200 hover:bg-teal-100 hover:text-teal-900 active:bg-teal-200"
      >
        <span>EMERGENCY</span>
      </div>
      <div
        onClick={() => handleSelect('about', 'CONSULTANCY')}
        className="flex h-10 w-full cursor-pointer items-center rounded-lg px-4 text-lg font-semibold bg-white text-teal-900 transition duration-200 hover:bg-teal-100 hover:text-teal-900 active:bg-teal-200"
      >
        <span>CONSULTANCY</span>
      </div>
      <div
        onClick={() => handleSelect('about', 'CHECKUP')}
        className="flex h-10 w-full cursor-pointer items-center rounded-lg px-4 text-lg font-semibold bg-white text-teal-900 transition duration-200 hover:bg-teal-100 hover:text-teal-900 active:bg-teal-200"
      >
        <span>CHECKUP</span>
      </div>
      <div
        onClick={() => handleSelect('about', 'CASUAL')}
        className="flex h-10 w-full cursor-pointer items-center rounded-lg px-4 text-lg font-semibold bg-white text-teal-900 transition duration-200 hover:bg-teal-100 hover:text-teal-900 active:bg-teal-200"
      >
        <span>CASUAL</span>
      </div>
    </>
  );
};

export const SelectedUser: ClientComponentProps<SelectedUserProps & any> = ({
  first_name,
  last_name,
  middle_name,
  email,
  id,
  handleRemove,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [animationComplete, setAnimationCompleted] = useState<boolean>(false);

  return (
    <AnimatePresence>
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
          opacity: 0,
          y: 20,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex h-9 w-fit items-center gap-4 rounded-full bg-emerald-100 p-2 px-4 text-xs font-semibold text-emerald-900 transition-all"
      >
        {getName({
          first_name,
          last_name,
          middle_name,
        })}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              onClick={() =>
                handleRemove({
                  first_name,
                  last_name,
                  middle_name,
                  email,
                  id,
                  handleRemove,
                })
              }
              initial={{ opacity: 0, width: 0, height: 0 }}
              animate={{ opacity: 1, width: 20, height: 20 }}
              exit={{ opacity: 0, width: 0 }}
              onAnimationComplete={() => setAnimationCompleted(true)}
              className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full bg-emerald-500 transition duration-200 hover:scale-[110%] hover:bg-emerald-600"
            >
              {animationComplete && <IoClose />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

interface Props {
  handleSelect: (type: string, value: string) => void;
}

interface SelectedUserProps extends SearchTelemedResProps {
  handleRemove?: (user: SearchTelemedResProps) => void;
}
