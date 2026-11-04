'use client';

import { useState, useCallback } from 'react';

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
import { Branch, City, Country, Doctor, Nurse, Site } from './Elements';
import type { LoadingStep, LoadingStepInfo } from './types';

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
    nurses,
    sites,
    doctors,
    setDobValue,
    validator,
    currentStep,
    getLoadingStepInfo,
    usernameStatus,
    handleUsernameChange,
    handlePhoneNumberChange,
    uniqueErrors,
    uniqueChecking,
    hasUniqueConflict,
    handleUniqueFieldChange,
    protocols,
  ] = useForm();

  const [showDob, setShowDob] = useState<boolean>(false);
  const phoneNumberField = register('phoneNumber');
  const emailField = register('email');
  const usernameField = register('username');

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

  // Progressive loading overlay component
  const ProgressiveLoadingOverlay = () => {
    const stepInfo = getLoadingStepInfo(currentStep);

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${stepInfo.progress}%` }}
            ></div>
          </div>

          {/* Step Icon */}
          <div className="flex items-center justify-center">
            {currentStep === 'success' ? (
              <FaCheckCircle className="h-12 w-12 text-green-500" />
            ) : currentStep === 'error' ? (
              <FaExclamationTriangle className="h-12 w-12 text-red-500" />
            ) : (
              <FaSpinner className="h-12 w-12 animate-spin text-blue-600" />
            )}
          </div>

          {/* Step Title */}
          <h3 className="text-xl font-semibold text-gray-800">
            {stepInfo.title}
          </h3>

          {/* Step Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {stepInfo.description}
          </p>

          {/* Progress Percentage */}
          <div className="text-sm font-medium text-blue-600">
            {stepInfo.progress}% Complete
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 mt-4">
            {['validating', 'preparing', 'submitting', 'processing', 'syncing', 'success'].map((step, index) => {
              const isActive = currentStep === step;
              const isCompleted = ['validating', 'preparing', 'submitting', 'processing', 'syncing', 'success'].indexOf(currentStep) > index;

              return (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${isCompleted
                    ? 'bg-green-500'
                    : isActive
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                    }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6 pb-8"
      // Disable keyboard navigation during loading
      onKeyDown={(e) => {
        if (loading && (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
        }
      }}
    >
      {/* Progressive Loading Overlay */}
      {loading && <ProgressiveLoadingOverlay />}

      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="First Name"
            label="First Name"
            placeholder="Enter patient first name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('firstName')}
            error={!!errors.firstName?.message}
            errorMessage={errors.firstName?.message || '&'}
            disabled={loading}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Middle Name"
            label="Middle Name"
            placeholder="Enter patient middle name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('middleName')}
            error={!!errors.middleName?.message}
            errorMessage={errors.middleName?.message || '&'}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Last Name"
            label="Last Name"
            placeholder="Enter patient last name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('lastName')}
            error={!!errors.lastName?.message}
            errorMessage={errors.lastName?.message || '&'}
            disabled={loading}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Phone number should be unique e.g (+92XXXXXXXXXX)"
            label="Phone Number"
            placeholder="Enter patient phone number with country code"
            icon="FaSquarePhone"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...phoneNumberField,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                handlePhoneNumberChange(e.target.value);
                handleUniqueFieldChange('phoneNumber', e.target.value);
              },
            }}
            loading={uniqueChecking.phoneNumber}
            error={!!errors.phoneNumber?.message || !!uniqueErrors.phoneNumber}
            errorMessage={
              errors.phoneNumber?.message || uniqueErrors.phoneNumber || '&'
            }
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Email address should be unique"
            label="Email Address"
            placeholder="Enter patient email address"
            icon="MdEmail"
            type="email"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...emailField,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                emailField.onChange(e);
                handleUniqueFieldChange('email', e.target.value);
              },
            }}
            loading={uniqueChecking.email}
            error={!!errors.email?.message || !!uniqueErrors.email}
            errorMessage={errors.email?.message || uniqueErrors.email || '&'}
            disabled={loading}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Create a strong password"
            label="Password"
            placeholder="Create patient password"
            icon="PiPasswordFill"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('password')}
            error={!!errors.password?.message}
            errorMessage={errors.password?.message || '&'}
            validatorErrors={validator?.getErrors('password')}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <DropdownSecondary
            title="Select patient gender"
            label="Select Gender"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaGenderless"
            error={!!errors.gender?.message}
            errorMessage={errors.gender?.message || '&'}
            selected={selectors.gender.title}
            disabled={loading}
          >
            <>
              <div
                onClick={() => !loading && handleSelect('gender')('MALE', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">MALE</span>
                <IoMdMale size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('gender')('FEMALE', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">FEMALE</span>
                <IoFemale size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('gender')('TRANS', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">TRANS</span>
                <FaTransgender size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('gender')('UNKNOWN', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">UNKNOWN</span>
                <FaQuestion size={18} />
              </div>
            </>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
          <DropdownSecondary
            title="Select patient title"
            label="Select Title"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdTitle"
            error={!!errors.title?.message}
            errorMessage={errors.title?.message || '&'}
            selected={selectors.title.title}
            disabled={loading}
          >
            <>
              <div
                onClick={() => !loading && handleSelect('title')('MR', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">MR</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('title')('MS', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">MS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('title')('MRS', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">MRS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('title')('MISS', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">MISS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('title')('MASTER', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">MASTER</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => !loading && handleSelect('title')('MADAM', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
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
            placeholder="Enter patient username"
            icon="FaUser"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...usernameField,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                usernameField.onChange(e);
                handleUsernameChange(e.target.value);
              },
            }}
            loading={uniqueChecking.username}
            error={!!errors.username?.message || !!uniqueErrors.username}
            errorMessage={
              errors.username?.message || uniqueErrors.username || '&'
            }
            disabled={loading}
          />
          {/* Username availability status indicator */}
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
            title="Select patient country"
            label="Select Country"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.country?.message}
            errorMessage={errors.country?.message || '&'}
            selected={selectors.country.title}
            disabled={loading}
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
            title="Select patient city"
            label="Select City"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.city?.message}
            errorMessage={errors.city?.message || '&'}
            selected={selectors.city.title}
            dropdownContentClassName="!h-[800px] max-h-[800px] !overflow-y-scroll"
            disabled={loading}
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
            disabled={loading}
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
            title="Enter patient weight in KG"
            label="Weight - KG"
            placeholder="Enter patient weight"
            type="number"
            icon="TbRulerMeasure"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('weight')}
            error={!!errors.weight?.message}
            errorMessage={errors.weight?.message || '&'}
            disabled={loading}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Enter patient height in cm"
            label="Height - cm"
            placeholder="Enter patient height in centimeters"
            icon="TbRulerMeasure"
            borderTheme
            type="number"
            step="any"
            inputMode="decimal"
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('height')}
            error={!!errors.height?.message}
            errorMessage={errors.height?.message || '&'}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex w-full items-start justify-between gap-10">
        <div className="w-1/2">
          <DropdownSecondary
            title="AViCardia Monitoring"
            label="AViCardia Monitoring"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaHeartbeat"
            error={!!errors.cardiac_monitoring?.message}
            errorMessage={errors.cardiac_monitoring?.message || '&'}
            selected={selectors.cardiac_monitoring.title}
            disabled={loading}
          >
            <>
              <div
                onClick={() => !loading && handleSelect('cardiac_monitoring')('YES', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">YES</span>
              </div>
              <div
                onClick={() => !loading && handleSelect('cardiac_monitoring')('NO', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">NO</span>
              </div>
              <div
                onClick={() => !loading && handleSelect('cardiac_monitoring')('LATER', undefined)}
                className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200 ${loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                <span className="font-medium">LATER</span>
              </div>
            </>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
          <DropdownSecondary
            title="Select Cardiac Monitoring Site"
            label="Cardiac Monitoring Site"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.site?.message}
            errorMessage={errors.site?.message || '&'}
            selected={selectors.site.title}
            disabled={loading || !selectors.cardiac_monitoring.title || !selectors.branch.id || sites.loading}
            disableMessage={
              !selectors.cardiac_monitoring.title
                ? 'Please select AViCardia Monitoring option first'
                : !selectors.branch.id
                  ? 'Please select branch first'
                  : sites.loading
                    ? 'Loading cardiac monitoring sites...'
                    : undefined
            }
          >
            <ClientGenerator data={sites.data} handleSelect={handleSelect}>
              <Site />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 items-start gap-x-10 gap-y-5">
        <div className="min-w-0">
          <DropdownSecondary
            title={protocols.loading ? 'Loading monitoring protocols...' : 'Select Monitring protocol'}
            label="Monitring protocol"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaHeartbeat"
            selected={selectors.monitring_protocol_id.title}
            disabled={loading || protocols.loading}
            disableMessage="Loading monitoring protocols..."
            error={!!protocols.error}
            errorMessage={protocols.error || '&'}
          >
            {protocols.data.length > 0 ? protocols.data.map((protocol) => (
              <button
                key={protocol.id}
                type="button"
                disabled={loading}
                onClick={() => handleSelect('monitring_protocol_id')(protocol.name, protocol.id)}
                className="flex min-h-10 w-full items-center rounded-lg bg-white p-2 px-4 text-left font-medium text-gray-500 transition duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {protocol.name}
              </button>
            )) : (
              <p className="p-2 text-sm text-gray-500">
                {protocols.error || 'No monitoring protocols available.'}
              </p>
            )}
          </DropdownSecondary>
        </div>
        <div className="min-w-0">
          <DropdownSecondary
            title="Assign Doctor"
            label="Select Doctor"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaUserDoctor"
            iconSize={16}
            error={!!errors.doctor?.message}
            errorMessage={errors.doctor?.message || '&'}
            selected={selectors.doctor.title}
            disabled={loading}
          >
            {doctors.loading ? (
              <div className="flex h-10 w-full items-center gap-2 rounded-lg bg-white p-2 px-4 text-gray-500">
                <FaSpinner className="h-3 w-3 animate-spin" />
                <span className="text-xs font-medium">Loading doctors...</span>
              </div>
            ) : selectors.site.id && doctors.data.length === 0 ? (
              <div className="flex min-h-10 w-full items-center rounded-lg bg-white p-3 px-4 text-gray-500">
                <span className="text-base font-medium">
                  No doctors available for the selected site.
                </span>
              </div>
            ) : !selectors.site.id ? (
              <div className="flex min-h-10 w-full items-center rounded-lg bg-white p-3 px-4 text-gray-500">
                <span className="text-base font-medium">
                  Select a cardiac monitoring site first.
                </span>
              </div>
            ) : (
              <ClientGenerator data={doctors.data} handleSelect={handleSelect}>
                <Doctor />
              </ClientGenerator>
            )}
          </DropdownSecondary>
        </div>
        <div className="min-w-0">
          <DropdownSecondary
            title="Assign Nurse"
            label="Select Nurse"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="RiNurseFill"
            iconSize={16}
            error={!!errors.nurse?.message}
            errorMessage={errors.nurse?.message || '&'}
            selected={selectors.nurse.title}
            disabled={loading}
          >
            <ClientGenerator data={nurses.data} handleSelect={handleSelect}>
              <Nurse />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
        <div className="min-w-0">
          <InputBasic
            title="Patient Current Address"
            label="Address"
            placeholder="Enter patient address"
            type="string"
            icon="FaLocationDot"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('address')}
            error={!!errors.address?.message}
            errorMessage={errors.address?.message || '&'}
            disabled={loading}
          />
        </div>
        <div className="min-w-0">
          <div className="flex w-full flex-col gap-3 text-xs sm:text-base md:text-lg">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">
                Date of birth
              </span>
            </div>

            <div
              className={`relative z-40 ${loading ? 'pointer-events-none opacity-50' : ''
                }`}
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
      </div>
      <div className="mt-5">
        <h3 className="mb-3 text-lg font-medium">Location</h3>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.899987179833!2d67.0764827755465!3d24.8540320840425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e209b36e80b%3A0x27a8a07d12e5bb25!2sShahrah-e-Faisal%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1690487423327!5m2!1sen!2s"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={loading ? 'pointer-events-none opacity-50' : ''}
          ></iframe>
        </div>
      </div>
      <div className="col-span-2 flex w-full flex-col gap-4 mt-6">
        <ButtonPrimary
          title={loading ? "Processing..." : "Save"}
          name={loading ? "Processing..." : "Save"}
          className="rounded-lg relative"
          disabled={
            loading ||
            Object.values(uniqueChecking).some(Boolean) ||
            hasUniqueConflict
          }
          type="submit"
        >
          {loading && (
            <FaSpinner className="absolute left-4 h-4 w-4 animate-spin text-white" />
          )}
        </ButtonPrimary>
        <Link passHref href="/superadmin/users">
          <ButtonPrimary
            name="Close"
            className="h-10 rounded-lg border bg-white"
            type="button"
            outlined
            disabled={loading}
          />
        </Link>
      </div>
    </form >
  );
};

export default Form;
