'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloudUploadOutline } from '@react-icons/all-files/io5/IoCloudUploadOutline';

import { ButtonPrimary, InputRadio } from '@common';
import { toggleDoctorEducationReducer } from '@slice';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Form: ClientComponent = () => {
  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const dispatch = useDispatch();

  const handleHideForm = () => dispatch(toggleDoctorEducationReducer());

  return (
    <AnimatePresence>
      {global.modals.doctorEducationForm && (
        <motion.form
          initial={{ right: -1000 }}
          animate={{ right: 0 }}
          transition={{
            type: 'keyframes',
            duration: 0.8,
          }}
          exit={{
            right: -1000,
          }}
          className="absolute right-0 top-24 flex h-[35rem] w-[26rem] flex-col justify-between rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Content
              </span>
              <div className="h-[3px] w-full rounded-full bg-t-color-secondary" />
            </div>
            <div className="mt-10 flex w-full flex-col gap-4">
              <div className="flex h-40 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-t-color-secondary bg-gray-100">
                <IoCloudUploadOutline className="stroke h-12 w-12 stroke-t-color-secondary" />
                <p className="text-xs">Upload files</p>
              </div>

              <div className="flex w-full items-center gap-4">
                <div className="flex w-1/2">
                  <InputRadio
                    label="Articles"
                    borderTheme
                    labelVariant="tiny"
                  />
                </div>
                <div className="flex w-1/2">
                  <InputRadio
                    label="Videos"
                    borderTheme
                    labelVariant="tiny"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-2">
              <ButtonPrimary
                name="Save"
                className="h-10 rounded-lg bg-t-color-secondary"
                onClick={handleHideForm}
                type="button"
              />
              <ButtonPrimary
                name="Close"
                className="h-10 rounded-lg border bg-transparent text-gray-600"
                onClick={handleHideForm}
                type="button"
              />
            </div>
          </>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default Form;
