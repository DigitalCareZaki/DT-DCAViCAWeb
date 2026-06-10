'use client';

import { useSearchParams } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import {
  InputBasic,
  ButtonPrimary,
  InputSelect,
  DropdownSecondary,
} from '@common';
import { toggleDoctorPatientAlertReducer } from '@slice';

import useForm from './useForm';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Form: ClientComponent = () => {
  const params = useSearchParams();

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const dispatch = useDispatch();

  const handleHideForm = () => dispatch(toggleDoctorPatientAlertReducer());

  const [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    handleReset,
  ] =
    useForm(params?.get('patient')?.toString() ?? '', handleHideForm);

  return (
    <AnimatePresence>
      {global.modals.doctorPatientAlertForm && (
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
          className="absolute right-0 top-24 flex h-[35rem] w-[26rem] flex-col justify-between rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Alert
              </span>
              <div className="h-[3px] w-full rounded-full doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary" />
            </div>

            <div className="h-full w-full overflow-y-scroll">
              <div className="mt-10 flex h-full w-full flex-col gap-4">
                <div className="flex w-full items-start gap-2">
                  <DropdownSecondary
                    title="Medication Unit"
                    label="Unit"
                    borderTheme
                    inputWrapperClassName="bg-background"
                    icon="IoSearch"
                    error={!!errors.type?.message?.length}
                    errorMessage={errors.type?.message}
                    selected={selectors.type}
                  >
                    <>
                      <div
                        onClick={() => handleSelect('type', 'SPO2')}
                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                      >
                        <span className="font-medium">SPO2</span>
                      </div>
                      <div
                        onClick={() => handleSelect('type', 'BLOODPRESSURE')}
                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                      >
                        <span className="font-medium">BLOOD PRESSURE</span>
                      </div>
                      <div
                        onClick={() => handleSelect('type', 'BLOODGLUCOSE')}
                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                      >
                        <span className="font-medium">BLOOD GLUCOSE</span>
                      </div>
                      <div
                        onClick={() => handleSelect('type', 'TEMPERATURE')}
                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                      >
                        <span className="font-medium">TEMPERATURE</span>
                      </div>
                    </>
                  </DropdownSecondary>
                </div>
                <div className="grid w-full grid-cols-2 gap-2">
                  <div className="min-w-0">
                    <InputBasic
                      label={`Low ${selectors.type === 'BLOODPRESSURE' ? '(Systolic)' : ''}`}
                      placeholder="Enter low value"
                      borderTheme
                      labelVariant="tiny"
                      title="Low value"
                      icon="FaPercentage"
                      defaultBorder
                      inputWrapperClassName="px-2"
                      inputClassName="w-0 flex-1 px-2 text-xs md:text-sm"
                      hookProps={register('range_low_1')}
                      error={!!errors.range_low_1?.message?.length}
                      errorMessage={errors.range_low_1?.message}
                    />
                  </div>
                  <div className="min-w-0">
                    <InputBasic
                      label={`High ${selectors.type === 'BLOODPRESSURE' ? '(Systolic)' : ''}`}
                      placeholder="Enter high value"
                      borderTheme
                      labelVariant="tiny"
                      title="High value"
                      icon="FaPercentage"
                      defaultBorder
                      inputWrapperClassName="px-2"
                      inputClassName="w-0 flex-1 px-2 text-xs md:text-sm"
                      hookProps={register('range_high_1')}
                      error={!!errors.range_high_1?.message?.length}
                      errorMessage={errors.range_high_1?.message}
                    />
                  </div>
                </div>
                {selectors.type === 'BLOODPRESSURE' && (
                  <div className="grid w-full grid-cols-2 gap-2">
                    <div className="min-w-0">
                      <InputBasic
                        label={`Low ${selectors.type === 'BLOODPRESSURE' ? '(Diastolic)' : ''}`}
                        placeholder="Enter low value"
                        borderTheme
                        labelVariant="tiny"
                        title="Low value"
                        icon="IoTimerSharp"
                        defaultBorder
                        inputWrapperClassName="px-2"
                        inputClassName="w-0 flex-1 px-2 text-xs md:text-sm"
                        hookProps={register('range_low_2')}
                        error={!!errors.range_low_2?.message?.length}
                        errorMessage={errors.range_low_2?.message}
                      />
                    </div>
                    <div className="min-w-0">
                      <InputBasic
                        label={`High ${selectors.type === 'BLOODPRESSURE' ? '(Diastolic)' : ''}`}
                        placeholder="Enter high value"
                        borderTheme
                        labelVariant="tiny"
                        title="High value"
                        icon="IoTimerSharp"
                        defaultBorder
                        inputWrapperClassName="px-2"
                        inputClassName="w-0 flex-1 px-2 text-xs md:text-sm"
                        hookProps={register('range_high_2')}
                        error={!!errors.range_high_2?.message?.length}
                        errorMessage={errors.range_high_2?.message}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-ssx font-bold text-gray-500">
                    <span>SMS</span>
                    <InputSelect theme />
                  </div>
                  <div className="flex items-center gap-2 text-ssx font-bold text-gray-500">
                    <span>E-MAIL</span>
                    <InputSelect theme />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-2">
              <ButtonPrimary
                name="Save"
                className="h-10 rounded-lg"
                loading={loading}
              />
              <ButtonPrimary
                name="Close"
                className="h-10 rounded-lg border bg-transparent text-gray-600"
                onClick={() => {
                  handleReset();
                  handleHideForm();
                }}
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
