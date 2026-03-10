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
import { FaCalendarAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import type { LoadingStep, LoadingStepInfo } from './types';

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

  const [register, onSubmit, errors, loading, selectedValues, setValue, handleSelect, handleSelectByAbd, serials, setSelectedSerial, selectedSerial, selectors, branches, handleSelectBranch, setSelectedValues, sites, handleSelectSite, currentStep, getLoadingStepInfo] =
    useForm(data, categories);

  const handleSelectField = (field: string, value: any) => {
    setSelectedValues((prev: any) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      // Auto-set ECG_Rec_ prefix when both cardiac_monitoring=YES or LATER and category=ECG
      const isYesOrLater = field === 'cardiac_monitoring' ? (value.value === 'YES' || value.value === 'LATER') : (prev.cardiac_monitoring?.value === 'YES' || prev.cardiac_monitoring?.value === 'LATER');
      const isEcg = field === 'category' ? value.value === 'ECG' : prev.category?.value === 'ECG';

      if (isYesOrLater && isEcg) {
        setValue('serial_number', 'ECG_Rec_');
      } else {
        setValue('serial_number', '');
      }

      return updated;
    });

    if (field === 'serial_number') {
      setSelectedSerial(value.name || []);
      setValue('serial_number', value.name);
    } else {
      setValue(field as any, value.value);
    }
  };

  // Sync serial number prefix when category changes via handleSelectByAbd
  useEffect(() => {
    if (!data) { // only for create (not edit)
      const isYesOrLater = selectedValues?.cardiac_monitoring?.value === 'YES' || selectedValues?.cardiac_monitoring?.value === 'LATER';
      const isEcg = selectedValues?.category?.value === 'ECG';
      if (isYesOrLater && isEcg) {
        setValue('serial_number', 'ECG_Rec_');
      } else {
        setValue('serial_number', '');
      }
    }
  }, [selectedValues?.category?.value, selectedValues?.cardiac_monitoring?.value]);
  // Progressive loading overlay component
  const ProgressiveLoadingOverlay = () => {
    const stepInfo = getLoadingStepInfo(currentStep);

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          {/* Progress Bar */}
          <div className="w-64 bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${stepInfo?.progress || 0}%` }}
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
            {stepInfo?.title}
          </h3>

          {/* Step Description */}
          <p className="text-sm text-gray-600 leading-relaxed px-4">
            {stepInfo?.description}
          </p>

          {/* Progress Percentage */}
          <div className="text-sm font-medium text-blue-600">
            {stepInfo?.progress || 0}% Complete
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 mt-4">
            {['validating', 'preparing', 'submitting', 'processing', 'syncing', 'success'].map((step, index) => {
              const isActive = currentStep === step;
              const isCompleted = ['validating', 'preparing', 'submitting', 'processing', 'syncing', 'success'].indexOf(currentStep) > index || (currentStep === 'success');

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
      className="relative flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-4 sm:p-6 mx-auto"
      // Disable keyboard navigation during loading
      onKeyDown={(e) => {
        if (loading && (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
        }
      }}
    >
      {/* Progressive Loading Overlay */}
      {loading && <ProgressiveLoadingOverlay />}

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
            placeholder={(selectedValues?.cardiac_monitoring?.value === 'YES' || selectedValues?.cardiac_monitoring?.value === 'LATER') && selectedValues?.category?.value === 'ECG' ? 'ECG_Rec_...' : 'Enter device serial number'}
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...register('serial_number'),
              onChange: (e: any) => {
                const isEcgWithMonitoring = (selectedValues?.cardiac_monitoring?.value === 'YES' || selectedValues?.cardiac_monitoring?.value === 'LATER') && selectedValues?.category?.value === 'ECG';
                if (isEcgWithMonitoring) {
                  const prefix = 'ECG_Rec_';
                  if (!e.target.value.startsWith(prefix)) {
                    e.target.value = prefix;
                    setValue('serial_number', prefix);
                  }
                }
              },
            }}
            error={!!errors.serial_number?.message?.length}
            errorMessage={errors.serial_number?.message || '&'}
          />
        </div>




      </div>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Select Site"
            label="Select Site"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaLocationDot"
            error={!!errors.site_id?.message?.length}
            errorMessage={(errors as any).site_id?.message || '&'}
            selected={sites?.find((s: any) => s.id === selectors.site_id)?.name || ''}
          >
            {Array.isArray(sites) && sites.length > 0 ? (
              sites.map((site: any) => (
                <div
                  key={site.id}
                  onClick={() => handleSelectSite(site.id)}
                  className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                >
                  <span className="font-medium">{site.name}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-400">No sites found</div>
            )}
          </DropdownSecondary>
        </div>
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="AViCardia Monitoring"
            label="AViCardia Monitoring"
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
