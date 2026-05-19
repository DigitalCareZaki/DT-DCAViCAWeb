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

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { Branch, City, Country, Department, Site } from './Elements';
import Link from 'next/link';

import Datepicker from 'tailwind-datepicker-react';
import type { IOptions } from 'tailwind-datepicker-react/types/Options';

const Form: React.FC = () => {
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
    departments,
    sites,
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
    handleUniqueFieldBlur,
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

  const phoneNumberField = register('phoneNumber');
  const emailField = register('email');
  const npiNumberField = register('npi_number');
  const pmdcNumberField = register('pmdc_number');

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6 pb-8"
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
            placeholder="Enter doctor first name"
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
            placeholder="Enter doctor middle name"
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
            placeholder="Enter doctor last name"
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
            placeholder="Enter doctor phone number with country code"
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
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                phoneNumberField.onBlur(e);
                handleUniqueFieldBlur('phoneNumber', e.target.value);
              },
            }}
            loading={uniqueChecking.phoneNumber}
            error={!!errors.phoneNumber?.message || !!uniqueErrors.phoneNumber}
            errorMessage={
              errors.phoneNumber?.message || uniqueErrors.phoneNumber || '&'
            }
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Email address should be unique"
            label="Email Address"
            placeholder="Enter doctor email address"
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
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                emailField.onBlur(e);
                handleUniqueFieldBlur('email', e.target.value);
              },
            }}
            loading={uniqueChecking.email}
            error={!!errors.email?.message || !!uniqueErrors.email}
            errorMessage={errors.email?.message || uniqueErrors.email || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Create a strong password"
            label="Password"
            placeholder="Create doctor password"
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
            title="Select doctor gender"
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
            title="Select doctor title"
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
            placeholder="Enter doctor username"
            icon="FaUser"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...register('username'),
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
            title="Select doctor country"
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
            title="Select doctor city"
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
          <DropdownSecondary
            title="AViCardia Monitoring"
            label="AViCardia Monitoring"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.avicardia_monitoring?.message}
            errorMessage={errors.avicardia_monitoring?.message || '&'}
            selected={selectors.avicardia_monitoring.title}
          >
            <>
              <div
                onClick={() => handleSelect('avicardia_monitoring')('YES', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">YES</span>
              </div>
              <div
                onClick={() => handleSelect('avicardia_monitoring')('NO', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">NO</span>
              </div>
              <div
                onClick={() => handleSelect('avicardia_monitoring')('LATER', undefined)}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
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
            disabled={!selectors.avicardia_monitoring.title || !selectors.branch.id || sites.loading}
            disableMessage={
              !selectors.avicardia_monitoring.title
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
      <div className="flex w-full items-start justify-between gap-10">
        <div className="w-1/2">
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
        <div className="w-1/2">
          <InputBasic
            title="Doctor Current Address"
            label="Address"
            placeholder="Enter doctor address"
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
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <DropdownSecondary
            title="Select Department"
            label="Select Department"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            iconSize={16}
            error={!!errors.department?.message}
            errorMessage={errors.department?.message || '&'}
            selected={selectors.department.title}
            disabled={!selectors.branch.id}
            disableMessage="Please select a branch first"
          >
            <ClientGenerator
              data={departments.data}
              handleSelect={handleSelect}
            >
              <Department />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Enter doctor employee id"
            label="Employee ID"
            placeholder="Enter doctor phone number with country code"
            icon="FaSquarePhone"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('employee_id')}
            error={!!errors.employee_id?.message}
            errorMessage={errors.employee_id?.message || '&'}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Institute"
            label="Institute"
            placeholder="Enter Institute"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('Institute')}
            error={!!errors.Institute?.message}
            errorMessage={errors.Institute?.message || '&'}
          />
        </div>

        <div className="w-1/2">
          <InputBasic
            title="Contract"
            label="Contract"
            placeholder="Enter Contract"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('Contract')}
            error={!!errors.Contract?.message}
            errorMessage={errors.Contract?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="NPI Number"
            label="NPI Number"
            placeholder="Enter doctor NPI number"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...npiNumberField,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                npiNumberField.onChange(e);
                handleUniqueFieldChange('npi_number', e.target.value);
              },
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                npiNumberField.onBlur(e);
                handleUniqueFieldBlur('npi_number', e.target.value);
              },
            }}
            loading={uniqueChecking.npi_number}
            error={!!errors.npi_number?.message || !!uniqueErrors.npi_number}
            errorMessage={
              errors.npi_number?.message || uniqueErrors.npi_number || '&'
            }
          />
        </div>

        <div className="w-1/2">
          <InputBasic
            title="PMDC Number"
            label="PMDC Number"
            placeholder="Enter doctor pmdc number"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...pmdcNumberField,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                pmdcNumberField.onChange(e);
                handleUniqueFieldChange('pmdc_number', e.target.value);
              },
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                pmdcNumberField.onBlur(e);
                handleUniqueFieldBlur('pmdc_number', e.target.value);
              },
            }}
            loading={uniqueChecking.pmdc_number}
            error={!!errors.pmdc_number?.message || !!uniqueErrors.pmdc_number}
            errorMessage={
              errors.pmdc_number?.message || uniqueErrors.pmdc_number || '&'
            }
          />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="mb-3 text-lg font-medium">Location</h3>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13626.3942171265!2d74.31685345000001!3d31.5203707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483f21216b1%3A0x758d4a58004e4d3f!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1690210321396!5m2!1sen!2s"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
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
    </form>
  );
};

export default Form;
