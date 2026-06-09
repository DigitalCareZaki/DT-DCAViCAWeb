'use client';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import Branch from './Branch';
import City from './City';
import { useRouter } from 'next/navigation'
import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [
    register,
    onSubmit,
    errors,
    loading,
    branches,
    selectedValues,
    handleSelect,
    cities,
  ] = useForm();

  const router = useRouter();


  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full h-fit max-w-4xl flex-col gap-5 rounded-2xl bg-white p-6 mx-auto"
    >
      {/* First row: Department and Description */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Department or Speciality"
            label="Department/Speciality"
            placeholder="Enter department or speciality name"
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
            title="Department description"
            label="About"
            placeholder="Enter department About"
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

      {/* Second row: Address and Zipcode */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Department Address"
            label="Address"
            placeholder="Enter where this department located"
            icon="FaLocationDot"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('address')}
            error={!!errors.address?.message?.length}
            errorMessage={errors.address?.message || '&'}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Department Zipcode"
            label="Zipcode"
            placeholder="Enter department zipcode"
            icon="FaLocationDot"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('zipcode')}
            error={!!errors.zipcode?.message?.length}
            errorMessage={errors.zipcode?.message || '&'}
          />
        </div>
      </div>

      {/* Third row: Branch and City */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Select Department Branch"
            label="Select Branch"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdPin"
            error={!!errors.branch_id?.message?.length}
            errorMessage={errors.branch_id?.message || '&'}
            selected={selectedValues?.branch?.name}
          >
            <ClientGenerator data={branches} handleSelect={handleSelect}>
              <Branch />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Select Department City"
            label="Select City"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdPin"
            error={!!errors.city?.message?.length}
            errorMessage={errors.city?.message || '&'}
            selected={selectedValues?.city?.name}
          >
            <ClientGenerator data={cities} handleSelect={handleSelect}>
              <City />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
      </div>

      <ButtonPrimary title="Save" name="Save" loading={loading} />
      <ButtonPrimary type='button' title="Close" name="Close" onClick={() => router.back()} outlined />

    </form>
  );
};

export default Form;
