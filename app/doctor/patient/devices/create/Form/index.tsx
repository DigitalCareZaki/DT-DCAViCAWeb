'use client';

import { useEffect, useMemo, useState } from 'react';

import Category from './Category';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { useRouter } from 'next/navigation';
import type { ClientComponentProps } from '@types';
import type { CreateDeviceProps } from './types';
import fetch from '@fetch';
import fetchWrapper from '@fetch';
const Form: ClientComponentProps<CreateDeviceProps> = ({ data }) => {

  const router = useRouter();

  // const [selectedSerial, setSelectedSerial] = useState<string[]>([]);
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
        value: 'BLOODPRESSURE',
      },
      {
        name: 'Blood Glucose',
        value: 'BLOODGLUCOSE',
      },
      {
        name: 'Temperature',
        value: 'TEMPERATURE',
      },
    ],
    []
  );



  const [register, onSubmit, errors, loading, selectedValues, setValue, handleSelect, handleSelectByAbd, serials, setSelectedSerial, selectedSerial, handleSelectField] =
    useForm(data, categories);





  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6 mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Select device category"
            label="Category"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdPin"
            error={!!errors.category?.message?.length}
            errorMessage={errors.category?.message || '&'}
            selected={selectedValues?.category?.name}
          >
            <ClientGenerator data={categories} handleSelect={handleSelectByAbd}>
              <Category />
            </ClientGenerator>
          </DropdownSecondary>
        </div>

        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Select serial number"
            label="Serial Number"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdPin"
            error={!!errors.serial_number?.message?.length}
            errorMessage={errors?.serial_number?.message || '&'}
            selected={selectedValues?.serial_number?.name || ''}
          >
            {serials?.length > 0 ? (
              serials?.map((serial: any, index: number) => {
                const item = { name: serial, value: serial };
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectField('serial_number', item)}
                    className="px-4 py-2 hover:bg-accent cursor-pointer"
                  >
                    {serial}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-muted">No serials available</div>
            )}
          </DropdownSecondary>
        </div>
      </div>


      {/* First row: Device title and description */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Device title"
            label="Title"
            placeholder="Enter device title"
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
            title="Device description"
            label="Description"
            placeholder="Enter device description"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('description')}
            error={!!errors.description?.message?.length}
            errorMessage={errors.description?.message || '&'}
          />
        </div>
      </div>
      {/* Second row: Device serial and category */}

      {/* Submit Button */}
      <ButtonPrimary
        title={data ? 'Update' : 'Save'}
        name={data ? 'Update' : 'Save'}
        loading={loading}
      />
      <ButtonPrimary
        title={'Close'}
        name={'Close'}
        onClick={() => router.back()}
      // loading={loading}
      />
    </form>
  );
};

export default Form;
