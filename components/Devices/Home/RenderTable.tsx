'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEdit, FaSync, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { CircleSpinner } from 'react-spinners-kit';

import { getName } from '@init-globals';
import { updateDevice, syncDevice } from '@service';
import { showModalReducer } from '@slice';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

type LoadingStep =
  | 'idle'
  | 'validating'
  | 'preparing'
  | 'submitting'
  | 'processing'
  | 'syncing'
  | 'success'
  | 'error';

interface LoadingStepInfo {
  step: LoadingStep;
  title: string;
  description: string;
  progress: number;
}

const RenderTable: ClientComponentProps<Props> = ({ userRole, data }) => {
  const dispatch = useDispatch();
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<LoadingStep>('idle');

  const StatusBadge = ({ status }: { status: string | boolean | undefined | null }) => {
    const isYes = status === true || status === 'YES';
    const isNo = status === 'NO';
    const isLater = status === 'LATER';

    if (isYes) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sx font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm transition-all hover:scale-105">
          <span className="w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse"></span>
          YES
        </span>
      );
    }
    if (isNo) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sx font-bold bg-red-50 text-red-700 border border-red-200 shadow-sm transition-all hover:scale-105">
          <span className="w-2 h-2 mr-2 rounded-full bg-red-500"></span>
          NO
        </span>
      );
    }
    if (isLater) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sx font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm transition-all hover:scale-105">
          <span className="w-2 h-2 mr-2 rounded-full bg-amber-500"></span>
          LATER
        </span>
      );
    }
    return <span className="text-gray-400 font-medium">-</span>;
  };

  const getLoadingStepInfo = (step: LoadingStep): LoadingStepInfo => {
    const steps: Record<LoadingStep, LoadingStepInfo> = {
      idle: {
        step: 'idle',
        title: 'Ready to Sync',
        description: 'Sync process is ready to begin',
        progress: 0,
      },
      validating: {
        step: 'validating',
        title: 'Validating Connection',
        description: 'Checking connection to Vivalink server...',
        progress: 20,
      },
      preparing: {
        step: 'preparing',
        title: 'Preparing Data',
        description: 'Organizing device information for sync...',
        progress: 40,
      },
      submitting: {
        step: 'submitting',
        title: 'Sending Sync Request',
        description: 'Initiating device sync with Vivalink...',
        progress: 60,
      },
      processing: {
        step: 'processing',
        title: 'Processing Request',
        description: 'Vivalink is processing the device synchronization...',
        progress: 70,
      },
      syncing: {
        step: 'syncing',
        title: 'Syncing with Vivalink...',
        description: 'Synchronizing device data with Vivalink monitoring system...',
        progress: 85,
      },
      success: {
        step: 'success',
        title: 'Device Synced Successfully!',
        description: 'All data has been updated and synchronized.',
        progress: 100,
      },
      error: {
        step: 'error',
        title: 'Sync Error Occurred',
        description: 'Something went wrong during the sync. Please try again.',
        progress: 0,
      },
    };
    return steps[step];
  };

  const ProgressiveLoadingOverlay = () => {
    const stepInfo = getLoadingStepInfo(currentStep);

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm">
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
              const order = ['validating', 'preparing', 'submitting', 'processing', 'syncing', 'success'];
              const isActive = currentStep === step;
              const isCompleted = order.indexOf(currentStep) > index || currentStep === 'success';

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

          {(currentStep === 'success' || currentStep === 'error') && (
            <button
              onClick={() => {
                setSyncingId(null);
                setCurrentStep('idle');
                if (currentStep === 'success') {
                  setTimeout(() => window.location.reload(), 1000);
                }
              }}
              className="mt-6 px-10 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleSync = async (el: any) => {
    try {

      console.log('el.id', el.id);
      setSyncingId(el.id);
      setCurrentStep('validating');

      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('preparing');

      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('submitting');

      const res = await syncDevice(el.id);

      if (res.success) {
        setCurrentStep('processing');
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentStep('syncing');
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentStep('success');
      } else {
        setCurrentStep('error');
        dispatch(showModalReducer({
          type: 'ERROR',
          message: 'Sync failed. Please check the connection.',
          show: true,
        }));
      }
    } catch (err) {
      setCurrentStep('error');
      dispatch(showModalReducer({
        type: 'ERROR',
        message: 'Sync failed. Please check the connection.',
        show: true,
      }));
    }
  };

  return (
    <>
      {syncingId && <ProgressiveLoadingOverlay />}
      {data.map((el: any) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 font-poppins"
          >
            <Link
              passHref
              href={`/${userRole}/devices/edit?id=${el.id}`}
              className="hover:underline hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary text-primary"
            >
              {el.title}
            </Link>
          </th>
          <td className="px-4 py-4">{el.serial_number}</td>
          <td className="px-4 py-4">{el.description}</td>
          <td className="px-4 py-4">{el.category}</td>
          <td className="px-4 py-4">
            {getName({
              ...el.created_by,
            })}
          </td>
          <td className="px-4 py-4">{el.branch.name}</td>
          <td className="px-4 py-4 text-center">
            <StatusBadge
              status={el.vivalink_synced ? 'YES' : el.cardiac_monitoring}
            />
          </td>
          <td className="px-4 py-4 text-center">
            {(() => {
              const status = el.vivalink_synced ? 'YES' : el.cardiac_monitoring;
              const showSync = status !== 'YES';

              if (!showSync) {
                return <span className="text-gray-400">-</span>;
              }

              return syncingId === el.id ? (
                <div className="flex justify-center">
                  <CircleSpinner size={20} color="#3b82f6" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaSync
                    title="Sync to Vivalink"
                    className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition-all hover:rotate-180 duration-500"
                    onClick={() => handleSync(el)}
                  />
                </div>
              );
            })()}
          </td>
          <td className="px-4 py-4">{el.assigned ? 'Assigned' : 'Not Assigned'}</td>
          <td className="px-4 py-4">
            {new Date(el.created_at).toLocaleString()}
          </td>
          <td className="px-4 py-4 flex items-center gap-3">
            <Link passHref href={`/${userRole}/devices/assign/?id=${el.id}`}>
              <FaEdit
                title="Manage Patients"
                className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary cursor-pointer text-xl"
              />
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
