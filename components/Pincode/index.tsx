'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ButtonPrimary, InputBasic } from '@common';

import type { ClientComponentProps } from '@types';
import type { PincodeProps } from './types';
import usePincode from './usePincode';

const Pincode: ClientComponentProps<PincodeProps> = ({ show, handleReset }) => {
  const [pincode, error, loading, onChange, onSubmit] = usePincode(handleReset);

  if (!show) return <></>;

  return (
    <>
      {createPortal(
        <div
          id="harisiqbal"
          className="fixed top-0 z-[999999999] flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <AnimatePresence>
            <motion.form
              onSubmit={onSubmit}
              className="flex h-fit w-[20%] flex-col justify-between gap-4 rounded-lg bg-white p-4 py-4 shadow-xl shadow-black/40"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-600">
                  Pincode requested
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {"You've"} been idle for too long. Please enter your pincode
                  to continue.
                </span>
              </div>
              <InputBasic
                label="Pincode"
                placeholder="Enter your pincode to coninue"
                borderTheme
                inputWrapperClassName="bg-background"
                inputClassName="bg-background"
                type="password"
                title="We need a pincode to verify your identity"
                value={pincode}
                onChange={onChange}
                error={!!error?.length}
                errorMessage={error}
              />
              <ButtonPrimary name="Accept" type="submit" loading={loading} />
            </motion.form>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </>
  );
};

export default Pincode;
