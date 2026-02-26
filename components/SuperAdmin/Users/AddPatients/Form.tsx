'use client';

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
    validator,
    currentStep,
    getLoadingStepInfo,
  ] = useForm();

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
            hookProps={register('phoneNumber')}
            error={!!errors.phoneNumber?.message}
            errorMessage={errors.phoneNumber?.message || '&'}
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
            hookProps={register('email')}
            error={!!errors.email?.message}
            errorMessage={errors.email?.message || '&'}
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
            hookProps={register('username')}
            error={!!errors.username?.message}
            errorMessage={errors.username?.message || '&'}
            disabled={loading}
          />
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
            title="Enter patient height in meters"
            label="Height - Meters"
            placeholder="Enter patient height"
            icon="TbRulerMeasure"
            borderTheme
            type="number"
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('height')}
            error={!!errors.height?.message}
            errorMessage={errors.height?.message || '&'}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
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
          {selectors.cardiac_monitoring.title === 'YES' ? (
            <DropdownSecondary
              title="Select Cardiac Monitoring Site"
              label="Select Cardiac Monitoring Site"
              borderTheme
              inputWrapperClassName="bg-background"
              icon="FaLocationDot"
              iconSize={16}
              error={!!errors.site?.message}
              errorMessage={errors.site?.message || '&'}
              selected={selectors.site.title}
              disabled={loading}
            >
              <ClientGenerator data={sites.data} handleSelect={handleSelect}>
                <Site />
              </ClientGenerator>
            </DropdownSecondary>
          ) : selectors.cardiac_monitoring.title === 'NO' || selectors.cardiac_monitoring.title === 'LATER' ? (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Cardiac Monitoring Site</label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Sync option available for late connection</span>
              </div>
            </div>
          ) : (
            <DropdownSecondary
              title="Select Cardiac Monitoring Site"
              label="Select Cardiac Monitoring Site"
              borderTheme
              inputWrapperClassName="bg-background"
              icon="FaLocationDot"
              iconSize={16}
              error={!!errors.site?.message}
              errorMessage={errors.site?.message || '&'}
              selected={selectors.site.title}
              disabled
              disableMessage="Please select AViCardia Monitoring option first"
            >
              <ClientGenerator data={sites.data} handleSelect={handleSelect}>
                <Site />
              </ClientGenerator>
            </DropdownSecondary>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
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
            disabled={loading || selectors.cardiac_monitoring.title !== 'YES'}
            disableMessage={selectors.cardiac_monitoring.title !== 'YES' ? 'Available when AViCardia Monitoring is YES' : 'Please select a site first'}
          >
            <ClientGenerator data={doctors.data} handleSelect={handleSelect}>
              <Doctor />
            </ClientGenerator>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
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
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
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
        <div className="w-1/2">
          <InputBasic
            title="Enter patient Date of birth"
            label="Date of birth"
            placeholder="Enter patient DOB"
            type="date"
            icon="FaCalendarAlt"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('dob')}
            error={!!errors.dob?.message}
            errorMessage={errors.dob?.message || '&'}
            disabled={loading}
          />
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
          disabled={loading}
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