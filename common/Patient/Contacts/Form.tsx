'use client';

import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonPrimary, InputBasic } from '@common';
import { toggleDoctorContactReducer } from '@slice';

import useForm from './useForm';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Form: ClientComponent = () => {
  const params = useSearchParams();

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const handleHideForm = () => dispatch(toggleDoctorContactReducer());

  const [register, onSubmit, errors, loading, error] = useForm(
    params?.get('patient')?.toString() ?? '',
    handleHideForm
  );

  return (
    <AnimatePresence>
      {global.modals.doctorContactForm && (
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
          onSubmit={onSubmit}
          className="absolute right-0 top-24 flex h-[35rem] w-[26rem] flex-col justify-between overflow-y-scroll rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Contacts
              </span>
              <div className="h-[3px] w-full rounded-full bg-theme-doctor-primary" />
            </div>

            <div className="mt-10 flex w-full flex-col gap-4">
              <InputBasic
                label="Name"
                placeholder="Enter contact name"
                borderTheme
                labelVariant="tiny"
                title="Contact name"
                defaultBorder
                hookProps={register('name')}
                error={!!errors.name?.message?.length}
                errorMessage={errors.name?.message}
              />
              <InputBasic
                label="Email"
                placeholder="Enter contact email"
                borderTheme
                labelVariant="tiny"
                title="Contact email"
                defaultBorder
                hookProps={register('email')}
                error={!!errors.email?.message?.length}
                errorMessage={errors.email?.message}
              />
              <InputBasic
                label="Phone"
                placeholder="Enter contact phone"
                borderTheme
                labelVariant="tiny"
                title="Contact phone"
                defaultBorder
                hookProps={register('phone')}
                error={!!errors.phone?.message?.length}
                errorMessage={errors.phone?.message}
              />
              <InputBasic
                label="Relationship"
                placeholder="Select contact relationship"
                borderTheme
                labelVariant="tiny"
                title="Contact relationship"
                defaultBorder
                hookProps={register('relationship')}
                error={!!errors.relationship?.message?.length}
                errorMessage={errors.relationship?.message}
              />
              <div className="flex w-full flex-col text-ssx font-semibold text-red-500">
                <span>{error}</span>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-2">
              <ButtonPrimary
                name="Save"
                className="h-10 rounded-lg bg-t-color-secondary"
                loading={loading}
              />
              <ButtonPrimary
                name="Close"
                className="h-10 rounded-lg border bg-transparent text-gray-600"
                onClick={handleHideForm}
                type="button"
                outlined
              />
            </div>
          </>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default Form;
