'use client';

import { useMemo } from 'react';

import Category from './Category';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { useRouter } from 'next/navigation'
import type { ClientComponentProps } from '@types';
import type { CreateTabletProps } from './types';

const Form: ClientComponentProps<CreateTabletProps> = ({ data }) => {
  const categories = useMemo(
    () => [
      {
        name: 'ECG',
        value: 'ECG',
      },
      {
        name: 'SPO2',
        value: 'SPO2',
      },
      {
        name: 'Blood Pressure',
        value: 'BLOOD_PRESSURE',
      },
      {
        name: 'Blood Glucose',
        value: 'BLOOD_GLUCOSE',
      },
      {
        name: 'Temperature',
        value: 'TEMPERATURE',
      },
    ],
    []
  );

  const [register, onSubmit, errors, loading, selectedValues, handleSelect] =
    useForm(data, categories);

  const router = useRouter();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6"
    >
      {/* First row: Tablet title and serial_number */}
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Tablet title"
            label="Title"
            placeholder="Enter tablet title"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('title')}
            error={!!errors.title?.message?.length}
            errorMessage={errors.title?.message || '&'}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Tablet serial"
            label="Serial number"
            placeholder="Enter tablet serial number"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('serial_number')}
            error={!!errors.serial_number?.message?.length}
            errorMessage={errors.serial_number?.message || '&'}
          />
        </div>
      </div>

      {/* Second row: Tablet category */}
      {/* <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full">
          <DropdownSecondary
            title="Select tablet category"
            label="Category"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdPin"
            error={!!errors.category?.message?.length}
            errorMessage={errors.category?.message || '&'}
            selected={selectedValues?.category?.name}
          >
            <ClientGenerator data={categories} handleSelect={handleSelect}>
              <Category />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
      </div> */}

      {/* Submit Button */}
      <ButtonPrimary
        title={data ? 'Update' : 'Save'}
        name={data ? 'Update' : 'Save'}
        loading={loading}
      />

      {/* Close Button */}
      <ButtonPrimary
        type='button'
        title={'Close'}
        name={'Close'}
        loading={loading}
        onClick={() => router.back()}
      />

    </form>
  );
};

export default Form;
