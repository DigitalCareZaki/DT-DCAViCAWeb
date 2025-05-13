'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { getName } from '@init-globals';

import { IoClose } from '@react-icons/all-files/io5/IoClose';

import type { PatientData } from './types';
import type { ClientComponentProps } from '@types';

interface SelectedUserProps extends PatientData {
  handleRemovePatient: (patient: PatientData) => void;
}

const SelectedPatient: ClientComponentProps<SelectedUserProps & any> = ({
  first_name,
  last_name,
  middle_name,
  email,
  id,
  handleRemovePatient,
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
        className="flex h-9 w-fit items-center gap-4 rounded-full p-2 px-4 text-xs font-semibold text-white transition-all superadmin:bg-theme-superadmin-primary admin:bg-theme-admin-primary doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary"
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
                handleRemovePatient({
                  first_name,
                  last_name,
                  middle_name,
                  email,
                  id,
                })
              }
              initial={{ opacity: 0, width: 0, height: 0 }}
              animate={{ opacity: 1, width: 20, height: 20 }}
              exit={{ opacity: 0, width: 0 }}
              onAnimationComplete={() => setAnimationCompleted(true)}
              className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full bg-gray-400 transition duration-200 hover:scale-[110%]"
            >
              {animationComplete && <IoClose />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectedPatient;
