'use client';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { Country, City } from './Elements';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [
    register,
    onSubmit,
    errors,
    loading,
    handleSelect,
    selectors,
    countries,
    cities,
  ] = useForm();

  const router = useRouter();

  return (
    <div className="mt-10 flex w-full justify-center pb-12">
      <form
        onSubmit={onSubmit}
        className="flex h-fit w-[40%] flex-col justify-between gap-10 rounded-2xl bg-white p-6"
      >
        <div className="flex w-full flex-col gap-5">
          <InputBasic
            label="Name"
            title="Branch Name"
            placeholder="Enter branch name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('name')}
            error={!!errors.name?.message?.length}
            errorMessage={errors.name?.message || '&'}
            type="text"
          />
          <InputBasic
            label="Email"
            title="Branch Associated Email"
            placeholder="Enter branch associated email"
            icon="MdEmail"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('email')}
            error={!!errors.email?.message?.length}
            errorMessage={errors.email?.message || '&'}
            type="email"
          />
          <InputBasic
            label="Phone Number"
            title="Branch Phone Number (Help Line)"
            placeholder="Enter branch phone number e.g (+9221XXXXXXXX)"
            icon="FaSquarePhone"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('phoneNumber')}
            error={!!errors.phoneNumber?.message?.length}
            errorMessage={errors.phoneNumber?.message || '&'}
            type="text"
          />
          <InputBasic
            label="Address"
            title="Branch complete address"
            placeholder="Enter branch complete address"
            icon="FaLocationDot"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('address')}
            error={!!errors.address?.message?.length}
            errorMessage={errors.address?.message || '&'}
            type="text"
          />
          <DropdownSecondary
            label="Select Country"
            title="Select branch country"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.country?.message}
            errorMessage={errors.country?.message || '&'}
            selected={selectors.country.title}
          >
            <ClientGenerator data={countries.data} handleSelect={handleSelect}>
              <Country />
            </ClientGenerator>
          </DropdownSecondary>
          <DropdownSecondary
            label="Select City"
            title="Select branch city"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.city?.message}
            errorMessage={errors.city?.message || '&'}
            selected={selectors.city.title}
            disabled={!selectors.country.id}
            disableMessage="Please select country first"
          >
            <ClientGenerator data={cities.data} handleSelect={handleSelect}>
              <City />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
        <div className="col-span-2 flex w-full flex-col gap-4">
          <ButtonPrimary title="Save" name="Save" className="rounded-lg" />
          {/* <Link passHref href="/superadmin/users"> */}
          <ButtonPrimary
            name="Close"
            title="Close"
            onClick={() => router.back()}
            className="h-10 rounded-lg border bg-white"
            type="button"
            outlined
          />
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};

export default Form;
