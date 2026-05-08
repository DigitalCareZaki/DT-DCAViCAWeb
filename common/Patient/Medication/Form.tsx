'use client';

import { useSearchParams } from 'next/navigation';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import {
  InputBasic,
  DropDownWithoutState,
  ButtonPrimary,
  DropdownSecondary,
  ClientGenerator,
} from '@common';
import { toggleDoctorMedicationReducer } from '@slice';

import useForm from './useForm';

import SelectMedicine from './SelectMedicine';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Form: ClientComponent = () => {
  const params = useSearchParams();

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const dispatch = useDispatch();

  const handleHideForm = () => dispatch(toggleDoctorMedicationReducer());

  const [
    register,
    onSubmit,
    errors,
    loading,
    handleSelector,
    selectors,
    error,
    handleSearchMedication,
    searching,
    serchingResults,
    currentMedicineName,
    handleSetCurrentMedicineName,
    watch,
  ] = useForm(params?.get('patient')?.toString() ?? '', handleHideForm);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const startDate = watch('start');

  const minEndDate = useMemo(() => {
    if (startDate) {
      return startDate;
    }
    return today;
  }, [startDate, today]);



  return (
    <AnimatePresence>
      {global.modals.doctorMedicationForm && (
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
          className="absolute right-0 top-40 flex h-[calc(100vh-12rem)] max-h-[35rem] min-h-[28rem] w-[28rem] flex-col justify-between rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Medication
              </span>
              <div className="h-[3px] w-full rounded-full doctor:bg-theme-doctor-primary patient:bg-theme-patient-primary nurse:bg-theme-nurse-primary" />
            </div>
            <div className="h-full w-full overflow-y-scroll">
              <div className="mt-10 flex w-full flex-col gap-4">
                <DropDownWithoutState
                  loading={searching}
                  loadingSpinnerColor="#6B7280"
                  label="Search medication"
                  placeholder="Search medication from the organization database"
                  title="Search medication"
                  overrideShow={0}
                  hideInfo
                  labelClassName="text-black"
                  inputWrapperClassName="doctor:focus-within:border-theme-doctor-primary"
                  inputClassName="bg-transparent placeholder:font-normal placeholder:text-gray-300"
                  icon="IoSearch"
                  // onClear={onClear} 
                  onChange={handleSearchMedication}
                  externalValue={currentMedicineName}
                  setExternalValue={handleSetCurrentMedicineName}
                >
                  <ClientGenerator
                    data={serchingResults}
                    handleSelect={handleSetCurrentMedicineName}
                  >
                    <SelectMedicine />
                  </ClientGenerator>
                </DropDownWithoutState>
                <div className="flex w-full items-start gap-4">
                  <div className="flex w-1/2">
                    <InputBasic
                      label="Start Date"
                      placeholder="Enter start date"
                      borderTheme
                      labelVariant="tiny"
                      title="Start date"
                      defaultBorder
                      type="date"
                      min={today}
                      hookProps={register('start')}
                      error={!!errors.start?.message?.length}
                      errorMessage={errors.start?.message}
                    />
                  </div>
                  <div className="flex w-1/2">
                    <InputBasic
                      label="End Date"
                      placeholder="Enter end date"
                      borderTheme
                      labelVariant="tiny"
                      title="End date"
                      defaultBorder
                      type="date"

                      min={minEndDate}
                      hookProps={register('end')}
                      error={!!errors.end?.message?.length}
                      errorMessage={errors.end?.message}
                    />
                  </div>
                </div>

                <DropdownSecondary
                  title="Frequency"
                  label="Frequency"
                  borderTheme
                  inputWrapperClassName="bg-background"
                  icon="IoSearch"
                  error={!!errors.frequency?.message?.length}
                  errorMessage={errors.frequency?.message}
                  selected={selectors.frequency?.toString()}
                >
                  <>
                    {[1, 2, 3].map((freq) => (
                      <div
                        key={freq}
                        onClick={() => handleSelector('frequency', freq)}
                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                      >
                        <span className="font-medium">{freq}</span>
                      </div>
                    ))}
                  </>
                </DropdownSecondary>
                {/* Render time inputs based on frequency */}
                {selectors.frequency && Array.from({ length: selectors.frequency }, (_, i) => (
                  <InputBasic
                    key={`time${i + 1}`}
                    label={`Time ${i + 1}`}
                    placeholder="Enter time"
                    borderTheme
                    labelVariant="tiny"
                    title={`Time ${i + 1}`}
                    defaultBorder
                    type="time"
                    hookProps={register(`time${i + 1}`)}
                    error={!!errors[`time${i + 1}`]?.message?.length}
                    errorMessage={errors[`time${i + 1}`]?.message}
                  />
                ))}
                <div className="flex w-full items-start gap-4">
                  <div className="flex w-full">
                    <InputBasic
                      label="Dosage"
                      placeholder="Enter dosage"
                      borderTheme
                      labelVariant="tiny"
                      title="Dosage"
                      defaultBorder
                      hookProps={register('dosage')}
                      error={!!errors.dosage?.message?.length}
                      errorMessage={errors.dosage?.message}
                    />
                  </div>
                </div>
                <DropdownSecondary
                  title="Medication Unit"
                  label="Unit"
                  borderTheme
                  inputWrapperClassName="bg-background"
                  icon="IoSearch"
                  error={!!errors.unit?.message?.length}
                  errorMessage={errors.unit?.message}
                  selected={selectors.unit}
                >
                  <>
                    <div
                      onClick={() => handleSelector('unit', 'TABLET')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">TABLET</span>
                    </div>
                    <div
                      onClick={() => handleSelector('unit', 'CAPSULE')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">CAPSULE</span>
                    </div>
                    <div
                      onClick={() => handleSelector('unit', 'SOFTGEL')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">SOFTGEL</span>
                    </div>
                    <div
                      onClick={() => handleSelector('unit', 'TEASPOON')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">TEASPOON</span>
                    </div>
                    <div
                      onClick={() => handleSelector('unit', 'TABLESPOON')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">TABLESPOON</span>
                    </div>
                  </>
                </DropdownSecondary>
                <div className="flex w-full flex-col text-ssx font-semibold text-red-500">
                  <span>{error}</span>
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
                  onClick={handleHideForm}
                  type="button"
                  outlined
                />
              </div>
            </div>
          </>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default Form;
