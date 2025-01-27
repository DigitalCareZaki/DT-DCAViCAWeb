'use client';

import {
  ButtonPrimary,
  InputBasic,
  DropdownSecondary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { City } from '../../../SuperAdmin/Users/AddPatients/Elements';

import type { ClientComponent } from '@types';
import Image from 'next/image';

const Form: ClientComponent = () => {
  const [
    register,
    onSubmit,
    errors,
    loading,
    handleFilePicker,
    uri,
    cities,
    selectedCity,
    handleSelect,
  ] = useForm();

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6"
    >
      <div className="flex w-full items-center justify-center">
        <div
          onClick={() => handleFilePicker()}
          className="relative h-20 w-20 cursor-pointer rounded-full bg-gray-200"
        >
          {uri && (
            <Image
              fill
              src={uri}
              alt="profile picture"
              className="h-full w-full rounded-full object-cover"
            />
          )}
        </div>
      </div>
      <InputBasic
        title="Organization Name"
        label="Name"
        placeholder="Enter organization name"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('name')}
        error={!!errors.name?.message}
        errorMessage={errors.name?.message || '&'}
      />
      <InputBasic
        title="Organization email"
        label="Email"
        placeholder="Enter organization email"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('email')}
        error={!!errors.email?.message}
        errorMessage={errors.email?.message || '&'}
      />
      <InputBasic
        title="Organization phone number"
        label="Phone Number"
        placeholder="Enter organization phone number"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('phone_number')}
        error={!!errors.phone_number?.message}
        errorMessage={errors.phone_number?.message || '&'}
      />
      <DropdownSecondary
        title="Select patient city"
        label="Select City"
        borderTheme
        inputWrapperClassName="bg-background"
        icon="FaLocationDot"
        iconSize={16}
        error={!!errors.city_id?.message}
        errorMessage={errors.city_id?.message || '&'}
        selected={selectedCity?.name}
      >
        <ClientGenerator data={cities} handleSelect={handleSelect}>
          <City />
        </ClientGenerator>
      </DropdownSecondary>
      <InputBasic
        title="Organization address"
        label="Address"
        placeholder="Enter organization address"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('address')}
        error={!!errors.address?.message}
        errorMessage={errors.address?.message || '&'}
      />
      <InputBasic
        title="Organization website"
        label="Website"
        placeholder="Enter organization website"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('website')}
        error={!!errors.website?.message}
        errorMessage={errors.website?.message || '&'}
      />
      <ButtonPrimary type="submit" loading={loading} name="Save" />
    </form>
  );
};

export default Form;
