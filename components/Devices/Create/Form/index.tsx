'use client';

import { useEffect, useMemo } from 'react';

import Category from './Category';

import {
  InputBasic,
  DropdownSecondary,
  ButtonPrimary,
  ClientGenerator,
} from '@common';
import { useUser } from '@selectors';
import useForm from './useForm';
import { usePathname, useRouter } from 'next/navigation';
import type { ClientComponentProps } from '@types';
import type { CreateDeviceProps } from './types';
import {
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

const Form: ClientComponentProps<CreateDeviceProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useUser();
  const currentRole = pathname?.split('/').filter(Boolean)[0];
  const devicesRoute = user?.role?.toLocaleLowerCase()
    ? `/${user.role.toLocaleLowerCase()}/devices`
    : currentRole
      ? `/${currentRole}/devices`
      : '/devices';
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

  const [
    register,
    onSubmit,
    errors,
    loading,
    selectedValues,
    setValue,
    handleSelect,
    handleSelectByAbd,
    serials,
    setSelectedSerial,
    selectedSerial,
    selectors,
    branches,
    handleSelectBranch,
    setSelectedValues,
    sites,
    handleSelectSite,
    currentStep,
    getLoadingStepInfo,
    dismissLoadingOverlay,
  ] = useForm(data, categories);

  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const isEcgMonitoringOption = (value?: string) =>
    value === 'YES' || value === 'NO' || value === 'LATER';
  const selectedBranchName =
    (branches as any)?.find((branch: any) => branch.id === selectors.branch_id)
      ?.name || '';
  const isEcgCategory = selectedValues?.category?.value === 'ECG';
  // AViCardia monitoring and site stay empty while disabled for non-ECG devices
  const selectedSiteName = isEcgCategory
    ? sites?.find((site: any) => site.id === selectors.site_id)?.name || ''
    : '';
  const isSiteDisabled =
    !isEcgCategory || (isSuperAdmin && !selectors.branch_id);
  const siteDisableMessage = !selectedValues?.category?.value
    ? 'Please select category first'
    : !isEcgCategory
      ? 'Site is only available for ECG devices'
      : 'Please select branch first';

  const handleSelectField = (field: string, value: any) => {
    setSelectedValues((prev: any) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      // Auto-set ECGRec_ prefix when cardiac_monitoring is selected and category=ECG
      const hasEcgMonitoringOption =
        field === 'cardiac_monitoring'
          ? isEcgMonitoringOption(value.value)
          : isEcgMonitoringOption(prev.cardiac_monitoring?.value);
      const isEcg =
        field === 'category'
          ? value.value === 'ECG'
          : prev.category?.value === 'ECG';

      if (hasEcgMonitoringOption && isEcg) {
        setValue('serial_number', 'ECGRec_');
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
    if (!data) {
      // only for create (not edit)
      const hasEcgMonitoringOption = isEcgMonitoringOption(
        selectedValues?.cardiac_monitoring?.value
      );
      const isEcg = selectedValues?.category?.value === 'ECG';
      if (hasEcgMonitoringOption && isEcg) {
        setValue('serial_number', 'ECGRec_');
      } else {
        setValue('serial_number', '');
      }
    }
  }, [
    selectedValues?.category?.value,
    selectedValues?.cardiac_monitoring?.value,
  ]);
  // Progressive loading overlay component
  const ProgressiveLoadingOverlay = () => {
    const stepInfo = getLoadingStepInfo(currentStep);

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          {/* Progress Bar */}
          <div className="h-3 w-64 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
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
          <p className="px-4 text-sm leading-relaxed text-gray-600">
            {stepInfo?.description}
          </p>

          {/* Progress Percentage */}
          <div className="text-sm font-medium text-blue-600">
            {stepInfo?.progress || 0}% Complete
          </div>

          {/* Step Indicators */}
          <div className="mt-4 flex items-center gap-2">
            {[
              'validating',
              'preparing',
              'submitting',
              'processing',
              'syncing',
              'success',
            ].map((step, index) => {
              const isActive = currentStep === step;
              const isCompleted =
                [
                  'validating',
                  'preparing',
                  'submitting',
                  'processing',
                  'syncing',
                  'success',
                ].indexOf(currentStep) > index || currentStep === 'success';

              return (
                <div
                  key={step}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500'
                      : isActive
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                  }`}
                />
              );
            })}
          </div>

          {currentStep === 'error' && (
            <button
              type="button"
              onClick={dismissLoadingOverlay}
              className="mt-2 h-12 min-w-36 rounded-lg bg-blue-600 px-8 text-base font-medium text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-4 sm:p-6"
      // Disable keyboard navigation during loading
      onKeyDown={(e) => {
        if (
          loading &&
          (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ')
        ) {
          e.preventDefault();
        }
      }}
    >
      {/* Progressive Loading Overlay */}
      {loading && <ProgressiveLoadingOverlay />}

      {/* First row: Device title and description */}
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
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
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
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
          <DropdownSecondary
            title="AViCardia Monitoring"
            label="AViCardia Monitoring"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdMonitorHeart"
            error={!!errors.cardiac_monitoring?.message?.length}
            errorMessage={(errors as any).cardiac_monitoring?.message || '&'}
            selected={
              isEcgCategory ? selectedValues?.cardiac_monitoring?.name : ''
            }
            disabled={!isEcgCategory}
            disableMessage={
              selectedValues?.category?.value
                ? 'AViCardia Monitoring is only available for ECG devices'
                : 'Please select category first'
            }
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
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Serial number"
            label="Serial number"
            placeholder={
              isEcgMonitoringOption(
                selectedValues?.cardiac_monitoring?.value
              ) && selectedValues?.category?.value === 'ECG'
                ? 'ECGRec_...'
                : 'Enter device serial number'
            }
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={{
              ...register('serial_number'),
              onChange: (e: any) => {
                const isEcgWithMonitoring =
                  isEcgMonitoringOption(
                    selectedValues?.cardiac_monitoring?.value
                  ) && selectedValues?.category?.value === 'ECG';
                if (isEcgWithMonitoring) {
                  const prefix = 'ECGRec_';
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
        {isSuperAdmin ? (
          <div className="w-full sm:w-1/2">
            <DropdownSecondary
              title="Branch"
              label="Branch"
              borderTheme
              inputWrapperClassName="bg-background"
              icon="FaLocationDot"
              error={!!errors.branch_id?.message?.length}
              errorMessage={(errors as any).branch_id?.message || '&'}
              selected={selectedBranchName}
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
        ) : (
          <div className="w-full sm:w-1/2">
            <DropdownSecondary
              title="Select Site"
              label="Select Site"
              borderTheme
              inputWrapperClassName="bg-background"
              icon="FaLocationDot"
              error={!!errors.site_id?.message?.length}
              errorMessage={(errors as any).site_id?.message || '&'}
              selected={selectedSiteName}
              disabled={isSiteDisabled}
              disableMessage={siteDisableMessage}
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
        )}
      </div>
      {isSuperAdmin && (
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
          <div className="w-full sm:w-1/2">
            <DropdownSecondary
              title="Select Site"
              label="Select Site"
              borderTheme
              inputWrapperClassName="bg-background"
              icon="FaLocationDot"
              error={!!errors.site_id?.message?.length}
              errorMessage={(errors as any).site_id?.message || '&'}
              selected={selectedSiteName}
              disabled={isSiteDisabled}
              disableMessage={siteDisableMessage}
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
          <div className="hidden sm:block sm:w-1/2" />
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
        type="button"
        title={'Close'}
        name={'Close'}
        onClick={() => router.push(devicesRoute)}
        className="h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl"
      />
    </form>
  );
};

export default Form;
