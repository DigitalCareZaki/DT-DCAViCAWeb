'use client';

import { useSearchParams } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { FaThermometerHalf } from '@react-icons/all-files/fa/FaThermometerHalf';
import { FaWater } from '@react-icons/all-files/fa/FaWater';
import { IoMdMedical as FaHandHoldingMedical } from '@react-icons/all-files/io/IoMdMedical';
import { MdLocalGasStation as MdOutlinePropaneTank } from '@react-icons/all-files/md/MdLocalGasStation';

import { useUser } from '@selectors';

import { ButtonPrimary, InputBasic, DropdownSecondary } from '@common';
import { toggleAddMeasurementFormReducer } from '@slice';

import useForm from './useForm';

import type { ClientComponent } from '@types';
import type { RenderUnitAndValueProps } from './types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const RenderUnitAndValueInputs = ({
  register,
  errors,
  selectors,
}: RenderUnitAndValueProps): JSX.Element => {
  return (
    <>
      {selectors.type && (
        <>
          <DropdownSecondary
            title="Unit"
            label="Unit"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaGenderless"
            error={!!errors.unit?.message}
            errorMessage={errors.unit?.message}
            selected={selectors.unit}
            disabled
            disableMessage="Unit is set automatically from the type"
          />
          <InputBasic
            label={selectors.type === 'BLOODPRESSURE' ? 'Systolic' : 'Value'}
            placeholder={`Enter ${selectors.type === 'BLOODPRESSURE' ? 'systolic' : ''} value`}
            borderTheme
            labelVariant="tiny"
            title="Measurement value"
            defaultBorder
            hookProps={register('value1')}
            error={!!errors.value1?.message?.length}
            errorMessage={errors.value1?.message}
          />

          {selectors.type === 'BLOODPRESSURE' && (
            <>
              <InputBasic
                label="Diastolic"
                placeholder="Enter diastolic value"
                borderTheme
                labelVariant="tiny"
                title="Measurement value"
                defaultBorder
                hookProps={register('value2')}
                error={!!errors.value2?.message?.length}
                errorMessage={errors.value2?.message}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

const Form: ClientComponent = () => {
  const params = useSearchParams();
  const [user] = useUser();

  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const handleHideForm = () => dispatch(toggleAddMeasurementFormReducer());

  const [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    handleReset,
  ] = useForm(
    user.type === 'PATIENT'
      ? user.id || ''
      : params?.get('patient')?.toString() || '',
    handleHideForm
  );

  return (
    <AnimatePresence>
      {global.modals.addMeasurementForm && (
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
          className="xs:w-[26rem] absolute right-0 top-24 flex h-[35rem] w-full max-w-[26rem] flex-col  rounded-lg rounded-r-none border bg-white p-6 shadow-2xl transition"
        >
          <>
            <div className="w-fit">
              <span className="text-sm font-bold uppercase text-gray-600">
                Add Measurements
              </span>
              <div
                className="h-[3px] w-full rounded-full doctor:bg-theme-doctor-primary patient:bg-theme-patient-primary
              nurse:bg-theme-nurse-primary"
              />
            </div>

            <div className="overflow-y-scroll">
              <div className="mt-10 flex w-full flex-col gap-4">
                <InputBasic
                  label="Title"
                  placeholder="Enter title"
                  borderTheme
                  labelVariant="tiny"
                  title="Measurement title"
                  defaultBorder
                  hookProps={register('title')}
                  error={!!errors.title?.message?.length}
                  errorMessage={errors.title?.message}
                />
                <DropdownSecondary
                  title="Measurement Type"
                  label="Measurement Type"
                  borderTheme
                  inputWrapperClassName="bg-background"
                  icon="FaGenderless"
                  error={!!errors.type?.message}
                  errorMessage={errors.type?.message}
                  selected={selectors.type}
                >
                  <>
                    <div
                      onClick={() => handleSelect('type')('SPO2')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">SPO2</span>
                      <MdOutlinePropaneTank size={18} />
                    </div>
                    <div
                      onClick={() => handleSelect('type')('BLOODPRESSURE')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">BLOOD PRESSURE</span>
                      <FaHandHoldingMedical size={18} />
                    </div>
                    <div
                      onClick={() => handleSelect('type')('BLOODGLUCOSE')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">BLOOD GLUCOSE</span>
                      <FaWater size={18} />
                    </div>

                    <div
                      onClick={() => handleSelect('type')('TEMPERATURE')}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">TEMPERATURE</span>
                      <FaThermometerHalf size={18} />
                    </div>
                  </>
                </DropdownSecondary>

                <RenderUnitAndValueInputs
                  register={register}
                  errors={errors}
                  selectors={selectors}
                />

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
                  onClick={() => {
                    handleReset();
                    handleHideForm();
                  }}
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
