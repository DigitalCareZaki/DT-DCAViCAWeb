'use client';

import { useMemo } from 'react';

import Category from './Category';
import { useUser } from '@selectors';

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

  const [user] = useUser();
  const role = user?.role?.toLowerCase();

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


  const [register, onSubmit, errors, loading, selectedValues, handleSelect, selectors, branches] = useForm(data, categories, role);

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

      {/* Branch Dropdown Start  */}

      {user?.role === 'SUPERADMIN' && (
        // <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full">
          <DropdownSecondary
            title="Branch"
            label="Branch"
            borderTheme
            inputWrapperClassName="bg-background"
            error={!!errors.branch_id?.message}
            errorMessage={errors.branch_id?.message}
            selected={branches.find((b: any) => b.id === selectors.branch_id)?.name || ''}
          >
            {branches && branches.length > 0 ? (
              branches.map((branch: any) => (
                <div
                  key={branch.id}
                  onClick={() => handleSelect('branch_id', branch.id)}
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
        // </div>
      )}


      {/* Branch Dropdown End  */}




      {/* Second row: Tablet category (hidden for admin) */}
      {/* {role !== 'admin' && (
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
          <div className="w-full">
            <DropdownSecondary
              title="Select tablet category"
              label="Category"
              borderTheme
              inputWrapperClassName="bg-background"
              icon="MdPin"
              error={!!errors.category?.message?.length}
              errorMessage={errors.category?.message || '&'}
              selected={selectedValues?.category?.value}
            >
              <ClientGenerator data={categories} handleSelect={handleSelect}>
                <Category />
              </ClientGenerator>
            </DropdownSecondary>
          </div>
        </div>
      )} */}

      {/* Submit Button */}
      <ButtonPrimary
        title={data ? 'Update' : 'Save'}
        name={data ? 'Update' : 'Save'}
        loading={loading}
        className='h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl'
      />

      {/* Close Button */}
      <ButtonPrimary
        type='button'
        title={'Close'}
        name={'Close'}
        onClick={() => router.back()}
        className='h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl'
      />

    </form>
  );
};

export default Form;
