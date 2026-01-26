'use client';

import { useEffect, useMemo, useState } from 'react';

import Category from './Category';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';
import { useUser } from '@selectors';
import useForm from './useForm';
import { useRouter } from 'next/navigation';
import type { ClientComponentProps } from '@types';
import type { CreateDeviceProps } from './types';
import fetch from '@fetch';
import fetchWrapper from '@fetch';
const Form: ClientComponentProps<CreateDeviceProps> = ({ data }) => {

  const router = useRouter();
  const [user] = useUser();
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

  const [register, onSubmit, errors, loading, selectedValues, setValue, handleSelect, handleSelectByAbd, serials, setSelectedSerial, selectedSerial, selectors, branches, handleSelectBranch, setSelectedValues] =
    useForm(data, categories);

  const handleSelectField = (field: string, value: any) => {
    setSelectedValues((prev: any) => ({
      ...prev,
      [field]: value
    }));

    if (field === 'serial_number') {
      setSelectedSerial(value.name || []);
      setValue('serial_number', value.name);
    } else {
      setValue(field as any, value.value);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6 mx-auto"
    >
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
          <InputBasic
            title="Serial number"
            label="Serial number"
            placeholder="Enter device serial number"
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
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Cardiac remote monitoring"
            label="Cardiac remote monitoring"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdMonitorHeart"
            error={!!errors.cardiac_monitoring?.message?.length}
            errorMessage={(errors as any).cardiac_monitoring?.message || '&'}
            selected={selectedValues?.cardiac_monitoring?.name}
          >
            {[
              { name: 'YES', value: 'YES' },
              { name: 'NO', value: 'NO' },
              { name: 'LATER', value: 'LATER' },
            ].map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelectField('cardiac_monitoring', option)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">{option.name}</span>
              </div>
            ))}
          </DropdownSecondary>
        </div>
      </div>
      {user?.role === 'SUPERADMIN' && (
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
          {/* Branch Code Start  */}
          {selectors && branches && (
            <div className="w-full sm:w-1/2">
              <DropdownSecondary
                title="Branch"
                label="Branch"
                borderTheme
                inputWrapperClassName="bg-background"
                error={!!errors.branch_id?.message?.length}
                errorMessage={(errors as any).branch_id?.message || '&'}
                selected={(branches as any)?.find((b: any) => b.id === selectors.branch_id)?.name || ''}
              >
                {Array.isArray(branches) && branches.length > 0 ? (
                  branches.map((branch: any) => (
                    <div
                      key={branch.id}
                      onClick={() => handleSelectBranch(branch.id)}
                      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                    >
                      <span className="font-medium">{branch.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-400">No branches found</div>
                )}
              </DropdownSecondary>
            </div>
          )}
          {/* Branch Code End  */}
        </div>
      )}
      {loading && selectedValues?.cardiac_monitoring?.value === 'YES' && (
        <div className="flex flex-col gap-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm font-medium text-blue-600">Syncing with Vivalink...</p>
        </div>
      )}
      {/* Submit Button */}
      <ButtonPrimary
        title={data ? 'Update' : 'Save'}
        name={data ? 'Update' : 'Save'}
        loading={loading}
        className="h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl"
      />
      <ButtonPrimary
        title={'Close'}
        name={'Close'}
        onClick={() => router.back()}
        className="h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl"
      />
    </form>
  );
};

export default Form;
