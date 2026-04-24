'use client';

import { useState } from 'react';

import { IoMdMale } from '@react-icons/all-files/io/IoMdMale';
import { IoFemale } from '@react-icons/all-files/io5/IoFemale';
import { FaTransgender } from '@react-icons/all-files/fa/FaTransgender';
import { FaQuestion } from '@react-icons/all-files/fa/FaQuestion';
import { MdTitle } from '@react-icons/all-files/md/MdTitle';
import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle';
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

import Datepicker from 'tailwind-datepicker-react';
import type { IOptions } from 'tailwind-datepicker-react/types/Options';

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
    setDobValue,
    validator,
    usernameStatus,
    handleUsernameChange,
  ] = useForm();

  const [showDob, setShowDob] = useState<boolean>(false);

  const dobOptions: IOptions = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    language: 'en',
    inputNameProp: 'dob',
    inputIdProp: 'dob',
    inputPlaceholderProp: 'mm/dd/yyyy',
    inputDateFormatProp: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
    datepickerClassNames: 'top-12 !z-40',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    theme: {
      background: 'bg-white',
      todayBtn: 'bg-blue-500 text-white',
      clearBtn: 'text-gray-700',
      icons: 'text-gray-500',
      text: 'text-gray-700',
      disabledText: 'text-gray-400',
      input:
        'h-12 bg-background border border-transparent rounded-lg py-4 text-gray-600 font-semibold',
      inputIcon: 'text-gray-500',
      selected: 'bg-blue-500 text-white',
    },
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6 pb-8"
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
            hookProps={{
              ...register('username'),
              onChange: (e) => {
                register('username').onChange(e);
                handleUsernameChange(e.target.value);
              },
            }}
            error={!!errors.username?.message}
            errorMessage={errors.username?.message || '&'}
          />
          {usernameStatus === 'checking' && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-500">
              <FaSpinner className="h-3 w-3 animate-spin" />
              <span>Checking availability...</span>
            </div>
          )}
          {usernameStatus === 'exists' && (
            <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <FaExclamationTriangle className="h-3 w-3" />
              <span>Username already exists. Please choose a different one.</span>
            </div>
          )}
          {usernameStatus === 'available' && (
            <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-500">
              <FaCheckCircle className="h-3 w-3" />
              <span>Username is available!</span>
            </div>
          )}
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
            dropdownContentClassName="!h-[800px] max-h-[800px] !overflow-y-scroll"
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
      <div className="flex w-full items-start justify-between gap-10">
        <div className="w-1/2">
          <div className="flex w-full flex-col gap-3 text-xs sm:text-base md:text-lg">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">
                Date of birth
              </span>
            </div>

            <div
              className={`relative z-40 ${loading ? 'pointer-events-none opacity-50' : ''}`}
            >
              <Datepicker
                options={dobOptions}
                onChange={(v) => setDobValue(v as any)}
                show={showDob}
                setShow={setShowDob}
              />
              <input type="hidden" {...register('dob')} />
            </div>

            {errors.dob?.message && (
              <span className="font-medium text-rose-500">
                {errors.dob.message}
              </span>
            )}
          </div>
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

      <div className="col-span-2 flex w-full flex-col gap-4 mt-6">
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
