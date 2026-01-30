'use client';

import { useDispatch, useSelector } from 'react-redux';

import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaUser } from '@react-icons/all-files/fa/FaUser';

import { FaUserNurse } from '@react-icons/all-files/fa/FaUserNurse';
import { FaShieldAlt } from '@react-icons/all-files/fa/FaShieldAlt';
import { FaSync } from 'react-icons/fa';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle';
import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner';

import { disableUser, syncVivalink } from '@service';
import { showModalReducer, updateUserStatusReducer } from '@slice';

import { getName } from '@init-globals';

import type { ClientComponentProps } from '@types';
import type { RenderTableProps } from './types';
import type { ReduxProps, StoreSuperAdminState } from '@store-types';

import { useState } from 'react';
import { CircleSpinner } from 'react-spinners-kit';
import UserProfileModal from './UserProfileModal';

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

const RenderTable: ClientComponentProps<RenderTableProps> = () => {
  const dispatch = useDispatch();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<LoadingStep>('idle');
  const [syncRole, setSyncRole] = useState<'DOCTOR' | 'PATIENT' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const { users } = useSelector<ReduxProps, StoreSuperAdminState>(
    (state) => state.superadmin
  );

  const handleDisable = async (id: string) => {
    try {
      if (loadingUserId === id) return;

      setLoadingUserId(id);
      const res = await disableUser(id);

      if (res?.success) {
        // Update the user status in Redux store
        dispatch(
          updateUserStatusReducer({
            userId: id,
            active: res.active,
          })
        );

        dispatch(
          showModalReducer({
            type: 'SUCCESS',
            message: `User ${res?.active ? 'activated' : 'deactivated'} successfully`,
            show: true,
          })
        );

        return;
      }

      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Cannot deactivate user',
          show: true,
        })
      );

    } catch (err) {
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Something went wrong',
          show: true,
        })
      );
    } finally {
      setLoadingUserId(null);
    }
  };

  const StatusBadge = ({ status }: { status: string | boolean | undefined | null }) => {
    const isYes = status === true || status === 'YES';
    const isNo = status === 'NO';
    const isLater = status === 'LATER';

    if (isYes) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-md font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm transition-all hover:scale-105">
          <span className="w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse"></span>
          YES
        </span>
      );
    }
    if (isNo) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-md font-bold bg-red-50 text-red-700 border border-red-200 shadow-sm transition-all hover:scale-105">
          <span className="w-2 h-2 mr-2 rounded-full bg-red-500"></span>
          NO
        </span>
      );
    }
    if (isLater) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-md font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm transition-all hover:scale-105">
          <span className="w-2 h-2 mr-2 rounded-full bg-amber-500"></span>
          LATER
        </span>
      );
    }
    return <span className="text-gray-400 font-medium">-</span>;
  };

  const handleConfirmationClick = (user: any) => {
    setSelectedUser({
      id: user.id,
      active: user.active,
      name: getName({
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
      }),
      ...user
    });
    setShowConfirmation(true);
  };

  const handleProfileClick = (user: any) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const getLoadingStepInfo = (step: LoadingStep, role: string): LoadingStepInfo => {
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
        description: `Organizing ${role.toLowerCase()} information for sync...`,
        progress: 40,
      },
      submitting: {
        step: 'submitting',
        title: 'Sending Sync Request',
        description: `Initiating ${role.toLowerCase()} sync with Vivalink...`,
        progress: 60,
      },
      processing: {
        step: 'processing',
        title: 'Processing Request',
        description: `Vivalink is processing the ${role.toLowerCase()} synchronization...`,
        progress: 70,
      },
      syncing: {
        step: 'syncing',
        title: 'Syncing with Vivalink...',
        description: `Synchronizing ${role.toLowerCase()} data with Vivalink monitoring system...`,
        progress: 85,
      },
      success: {
        step: 'success',
        title: `${role.charAt(0) + role.slice(1).toLowerCase()} Synced Successfully!`,
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

  // Progressive loading overlay component
  const ProgressiveLoadingOverlay = ({ role }: { role: string }) => {
    const stepInfo = getLoadingStepInfo(currentStep, role);

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
                setSyncRole(null);
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

  const handleSync = async (user: any) => {
    try {
      const id = user.role === 'DOCTOR' ? user.doctor?.id : user.role === 'PATIENT' ? user.patient?.id : null;
      if (!id) return;
      console.log('id ', id);

      setSyncingId(user.id);
      setSyncRole(user.role);
      setCurrentStep('validating');

      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('preparing');

      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('submitting');

      const res = await syncVivalink(id);

      if (res.success) {
        setCurrentStep('processing');
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentStep('syncing');
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentStep('success');
      } else {
        setCurrentStep('error');
        dispatch(
          showModalReducer({
            type: 'ERROR',
            message: res.message || 'Sync failed',
            show: true,
          })
        );
      }
    } catch (err) {
      setCurrentStep('error');
    }
  };

  const handleConfirmAction = async () => {
    if (selectedUser) {
      await handleDisable(selectedUser.id);
      // Close modal and reset state after successful action
      setShowConfirmation(false);
      setSelectedUser(null);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setSelectedUser(null);
  };

  return (
    <>
      {syncingId && syncRole && <ProgressiveLoadingOverlay role={syncRole} />}
      {users.map((el) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >           {getName({
            first_name: el.first_name,
            last_name: el.last_name,
            middle_name: el.middle_name,
          })}
          </th>
          <td className="px-6 py-4">{el.email}</td>
          <td className="px-6 py-4">
            {
              el.role === 'DOCTOR' ? el.doctor?.departments?.[0]?.title :
                el.role === 'NURSE' ? el.nurse?.department?.title :
                  el.role === 'PATIENT' ? el.patient?.doctors?.[0]?.departments?.[0]?.title : '-'
            }</td>
          <td className="px-6 py-4">{el.phone_number}</td>
          {/* <td className="px-6 py-4">{el.username}</td> */}
          <td className="px-6 py-4">{el.role}</td>
          <td className="px-6 py-4">{el.gender}</td>
          <td className="px-6 py-4">{el.associated_branches[0]?.name}</td>
          <td className="px-6 py-4 text-center">
            <StatusBadge
              status={
                el.role === 'DOCTOR'
                  ? el.doctor?.vivalink_synced ? 'YES' : el.doctor?.avicardia_monitoring
                  : el.role === 'PATIENT'
                    ? el.patient?.vivalink_synced ? 'YES' : el.patient?.cardiac_monitoring
                    : '-'
              }
            />
          </td>
          <td className="px-6 py-4 text-center">
            {(() => {
              if (el.role !== 'DOCTOR' && el.role !== 'PATIENT') {
                return <span className="text-gray-400">-</span>;
              }

              const status = el.role === 'DOCTOR'
                ? (el.doctor?.vivalink_synced ? 'YES' : el.doctor?.avicardia_monitoring)
                : (el.patient?.vivalink_synced ? 'YES' : el.patient?.cardiac_monitoring);

              if (status !== 'NO' && status !== 'LATER') {
                return <span className="text-gray-400">-</span>;
              }

              return syncingId === el.id ? (
                <div className="flex justify-center">
                  <CircleSpinner size={20} color="#3b82f6" />
                </div>
              ) : (
                <FaSync
                  title="Sync to Vivalink"
                  className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition-all hover:rotate-180 duration-500 mx-auto"
                  onClick={() => handleSync(el)}
                />
              );
            })()}
          </td>
          <td className="flex items-center gap-2 px-6 py-4 text-md ">
            {loadingUserId === el.id ? (
              <CircleSpinner size={20} color="#000000" />
            ) : (
              <FaShieldAlt
                onClick={() => handleConfirmationClick(el)}
                title={el.active ? "Disable user account" : "Enable user account"}
                className={`${!el.active ? 'text-red-500' : 'text-green-500'} hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary`}
              />
            )}


            <FaUser
              title="User Profile"
              className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-doctor-primary cursor-pointer"
              onClick={() => handleProfileClick(el)}
            />




            {/* {el.role === 'PATIENT' || el.role === 'DOCTOR' || el.role === 'NURSE' && (
              <>
                <FaUser
                  // title="Assign patient to a doctor"
                  title="User Profile"

                  className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-doctor-primary"
                />
                <FaUserNurse
                  title="Assign patient to a nurse"
                  className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-doctor-primary"
                />
              </>
            )} */}
          </td>
        </tr>
      ))}

      {/* Confirmation Modal */}
      {showConfirmation && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedUser.active ? 'Deactivate User' : 'Activate User'}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedUser.active
                  ? `Do you want to deactivate user "${selectedUser.name}"?`
                  : `Do you want to activate user "${selectedUser.name}"?`
                }
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCancelAction}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${selectedUser.active
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                  {selectedUser.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showProfile && selectedUser && (
        <UserProfileModal user={selectedUser} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default RenderTable;
