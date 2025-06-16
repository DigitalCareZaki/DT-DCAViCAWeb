'use client';

import { IoMdMale } from '@react-icons/all-files/io/IoMdMale';
import { IoFemale } from '@react-icons/all-files/io5/IoFemale';
import { FaTransgender } from '@react-icons/all-files/fa/FaTransgender';
import { FaQuestion } from '@react-icons/all-files/fa/FaQuestion';
import { MdTitle } from '@react-icons/all-files/md/MdTitle';
import Link from 'next/link';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { Branch, City, Country } from './Elements';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    branches,
    cities,
    countries,
    validator,
  ] = useForm();

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6 pb-32"
    >
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="First Name"
            label="First Name"
            placeholder="Enter admin first name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('firstName')}
            error={!!errors.firstName?.message}
            errorMessage={errors.firstName?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Middle Name"
            label="Middle Name"
            placeholder="Enter admin middle name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('middleName')}
            error={!!errors.middleName?.message}
            errorMessage={errors.middleName?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Last Name"
            label="Last Name"
            placeholder="Enter admin last name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('lastName')}
            error={!!errors.lastName?.message}
            errorMessage={errors.lastName?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Phone number should be unique e.g (+92XXXXXXXXXX)"
            label="Phone Number"
            placeholder="Enter admin phone number with country code"
            icon="FaSquarePhone"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('phoneNumber')}
            error={!!errors.phoneNumber?.message}
            errorMessage={errors.phoneNumber?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Email address should be unique"
            label="Email Address"
            placeholder="Enter admin email address"
            icon="MdEmail"
            type="email"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('email')}
            error={!!errors.email?.message}
            errorMessage={errors.email?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Create a strong password"
            label="Password"
            placeholder="Create admin password"
            icon="PiPasswordFill"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('password')}
            error={!!errors.password?.message}
            errorMessage={errors.password?.message || '&'}
            validatorErrors={validator?.getErrors('password')}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <DropdownSecondary
            title="Select admin gender"
            label="Select Gender"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaGenderless"
            error={!!errors.gender?.message}
            errorMessage={errors.gender?.message || '&'}
            selected={selectors.gender.title}
          >
            <>
              <div
                onClick={() => handleSelect('gender')('MALE', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MALE</span>
                <IoMdMale size={18} />
              </div>
              <div
                onClick={() => handleSelect('gender')('FEMALE', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">FEMALE</span>
                <IoFemale size={18} />
              </div>
              <div
                onClick={() => handleSelect('gender')('TRANS', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">TRANS</span>
                <FaTransgender size={18} />
              </div>
              <div
                onClick={() => handleSelect('gender')('UNKNOWN', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">UNKNOWN</span>
                <FaQuestion size={18} />
              </div>
            </>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
          <DropdownSecondary
            title="Select admin title"
            label="Select Title"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdTitle"
            error={!!errors.title?.message}
            errorMessage={errors.title?.message || '&'}
            selected={selectors.title.title}
          >
            <>
              <div
                onClick={() => handleSelect('title')('MR', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MR</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MS', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MRS', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MRS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MISS', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MISS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MASTER', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MASTER</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MADAM', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MADAM</span>
                <MdTitle size={18} />
              </div>
            </>
          </DropdownSecondary>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Username should be unique"
            label="Username"
            placeholder="Enter admin username"
            icon="FaUser"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('username')}
            error={!!errors.username?.message}
            errorMessage={errors.username?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <DropdownSecondary
            title="Select admin country"
            label="Select Country"
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
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <DropdownSecondary
            title="Select admin city"
            label="Select City"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.city?.message}
            errorMessage={errors.city?.message || '&'}
            selected={selectors.city.title}
            dropdownContentClassName="!h-[800px]"
          >
            <ClientGenerator data={cities.data} handleSelect={handleSelect}>
              <City />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
          <DropdownSecondary
            title="Select Branch"
            label="Select Branch"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.branch?.message}
            errorMessage={errors.branch?.message || '&'}
            selected={selectors.branch.title}
          >
            <ClientGenerator data={branches.data} handleSelect={handleSelect}>
              <Branch />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Enter admin Date of birth"
            label="Date of birth"
            placeholder="Enter admin DOB"
            type="date"
            icon="FaCalendarAlt"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('dob')}
            error={!!errors.dob?.message}
            errorMessage={errors.dob?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Admin Current Address"
            label="Address"
            placeholder="Enter Admin address"
            type="string"
            icon="FaLocationDot"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('address')}
            error={!!errors.address?.message}
            errorMessage={errors.address?.message || '&'}
          />
        </div>
      </div>

      <div className="col-span-2 flex w-full flex-col gap-4">
        <ButtonPrimary title="Save" name="Save" className="rounded-lg" />
        <Link passHref href="/superadmin/users">
          <ButtonPrimary
            name="Close"
            className="h-10 rounded-lg border bg-white"
            type="button"
            outlined
          />
        </Link>
      </div>
    </form>
  );
};

export default Form;
