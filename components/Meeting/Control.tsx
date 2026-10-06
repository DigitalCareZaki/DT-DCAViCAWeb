'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { FaPhone } from '@react-icons/all-files/fa/FaPhone';
import { FaMicrophone } from '@react-icons/all-files/fa/FaMicrophone';
import { FaHandPaper } from '@react-icons/all-files/fa/FaHandPaper';
import { MdCameraAlt } from '@react-icons/all-files/md/MdCameraAlt';
import { MdOutlineScreenShare } from "react-icons/md";
import { MdShowChart } from '@react-icons/all-files/md/MdShowChart';
import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical';
import { FaInfoCircle } from '@react-icons/all-files/fa/FaInfoCircle';
import { InputBasic, ButtonPrimary } from '@common';
import {
  toggleDoctorAppointmentPatientVitalsReducer,
  toggleMicReducer,
  toggleCameraReducer,
  handleEventReducer,
  toggleScreenSharingReducer,
  showModalReducer,
} from '@slice';

import { useUser } from '@selectors';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import type { ClientComponentProps } from '@types';
import type { ModalState, ReduxProps, StoreMeetingState } from '@store-types';
import { telemedReportValidator } from './validator';
import closeMeetingTab from './closeMeetingTab';
import { toast } from 'react-hot-toast';

import type { ControlProps } from './types';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';


// Modal Component
const Modal = ({ isOpen, onClose, id }: { isOpen: boolean; onClose: () => void; id: string }) => {

  const [user] = useUser();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm({
    resolver: vestResolver(telemedReportValidator),
  });

  const handleShowModal = async (payload: ModalState) => {
    dispatch(showModalReducer(payload));

    // Auto-close if success
    if (payload.type === 'SUCCESS') {
      setTimeout(() => {
        onClose();
        dispatch(showModalReducer({ type: undefined, message: '', show: false }));
      }, 2000);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (!user?.token) {
        console.error('User token is missing');
        toast.error('User token is missing');
        // handleShowModal({
        //   type: 'ERROR',
        //   message: 'User token is missing',
        //   show: true,
        // });
        return;
      }

      const payload = {
        appointmentId: id,
        observations: data?.observations,
        diagnosis: data?.diagnosis,
        medications: data?.prescribedMedications,
        procedure: data?.procedureRecommended,
        follow_up_date: new Date(data?.followupDate)
      };



      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/web/telemed/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });


      const result = await res.json();



      if (!res.ok) {
        // Show error modal

        toast.error(result?.message ?? 'Something went wrong');

        // handleShowModal({
        //   type: 'ERROR',
        //   message: result?.message ?? 'Something went wrong',
        //   show: true,
        // });
        return;
      }
      toast.success('Report Submitted Successfully');
      onClose();
      // Show success modal
      // handleShowModal({
      //   type: 'SUCCESS',
      //   message: result?.message ?? 'Report submitted successfully',
      //   show: true,
      // });

    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(error?.message ?? 'An unexpected error occurred');
      // handleShowModal({
      //   type: 'ERROR',
      //   message: error?.message ?? 'An unexpected error occurred',
      //   show: true,
      // });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="mx-auto rounded-2xl bg-white shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="bg-white pt-4 px-4 flex justify-between items-center border-b border-gray-100 pb-2 rounded-t-2xl">
          <h2 className="text-lg sm:text-xl font-semibold text-black">
            Avica Teleconsultation Report
          </h2>
          {/* Cancel Icon */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black rounded-full p-1 transition"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <div className="flex w-full flex-col gap-2 sm:gap-3 px-4 py-3 sm:py-4">
            <InputBasic
              name="observations"
              placeholder="Enter Observations"
              defaultBorder
              inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
              label="Observations"
              inputClassName="bg-transparent placeholder:text-gray-300 text-black text-sm sm:text-base px-2 py-1 focus:border-black w-full"
              hideInfo
              labelClassName="text-black text-sm sm:text-base"
              hookProps={register('observations', { required: "Observations are required" })}
              error={!!errors?.observations}
              errorMessage={errors?.observations?.message}
              errorClassName="text-red-500 text-xs sm:text-sm"
            />

            <InputBasic
              name="diagnosis"
              placeholder="Enter Diagnosis"
              defaultBorder
              inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
              label="Diagnosis"
              inputClassName="bg-transparent placeholder:text-gray-300 text-black text-sm sm:text-base px-2 py-1 focus:border-black w-full"
              hideInfo
              labelClassName="text-black text-sm sm:text-base"
              hookProps={register('diagnosis', { required: "Diagnosis is required" })}
              error={!!errors?.diagnosis}
              errorMessage={errors?.diagnosis?.message}
              errorClassName="text-red-500 text-xs sm:text-sm"
            />

            <InputBasic
              name="prescribedMedications"
              placeholder="Prescribed Medications"
              defaultBorder
              inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
              label="Prescribed Medications"
              inputClassName="bg-transparent placeholder:text-gray-300 text-black text-sm sm:text-base px-2 py-1 focus:border-black w-full"
              hideInfo
              labelClassName="text-black text-sm sm:text-base"
              hookProps={register("prescribedMedications", { required: "Prescribed Medications are required" })}
              error={!!errors?.prescribedMedications}
              errorMessage={errors?.prescribedMedications?.message}
              errorClassName="text-red-500 text-xs sm:text-sm"
            />

            <InputBasic
              name="procedureRecommended"
              placeholder="Procedure Recommended"
              defaultBorder
              inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
              label="Procedure Recommended"
              inputClassName="bg-transparent placeholder:text-gray-300 text-black text-sm sm:text-base px-2 py-1 focus:border-black w-full"
              hideInfo
              labelClassName="text-black text-sm sm:text-base"
              hookProps={register("procedureRecommended", { required: "Procedure Recommended is required" })}
              error={!!errors?.procedureRecommended}
              errorMessage={errors?.procedureRecommended?.message}
              errorClassName="text-red-500 text-xs sm:text-sm"
            />

            <InputBasic
              type='date'
              name="followupDate"
              placeholder="Follow Up Date"
              defaultBorder
              inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
              label="Follow Up Date"
              inputClassName="bg-transparent placeholder:text-gray-300 text-black text-sm sm:text-base px-2 py-1 focus:border-black w-full"
              hideInfo
              labelClassName="text-black text-sm sm:text-base"
              hookProps={register("followupDate", { required: "Follow Up Date is required" })}
              error={!!errors?.followupDate}
              errorMessage={errors?.followupDate?.message}
              errorClassName="text-red-500 text-xs sm:text-sm"
            />

            <div className="w-full mt-2 sm:mt-4 pb-4 flex justify-center">
              <ButtonPrimary
                type="submit"
                className="h-10 sm:h-12 text-sm sm:text-base w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                name="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ControlPropsWithModal extends ControlProps {
  setIsModalOpen: (open: boolean) => void;
  setShowFeedbackModal?: (open: boolean) => void;
}

const Control: ClientComponentProps<ControlPropsWithModal> = ({ id, setIsModalOpen, setShowFeedbackModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user] = useUser();
  // Read from the store: sharing can also be stopped by the browser, not just this button
  const { screenSharing } = useSelector<ReduxProps, StoreMeetingState>(
    (state) => state.meeting
  );
  const [controlls, setControlls] = useState({
    muteMicrophone: false,
    muteCamera: false,
    handControl: false,
  });

  const handleCancelMeeting = () => {
    const isPatient = user?.role === 'PATIENT' || user?.type === 'PATIENT';
    if (isPatient && setShowFeedbackModal) {
      setShowFeedbackModal(true);
    } else {
      const userType = user?.type?.toLowerCase() ?? 'doctor';
      closeMeetingTab(() => router.push(`/${userType}/telemed`));
    }
  };

  const handleShowVitals = () =>
    dispatch(toggleDoctorAppointmentPatientVitalsReducer());

  const handleToggleCamera = () => {
    dispatch(toggleCameraReducer());
    setControlls((prev) => ({ ...prev, muteCamera: !prev.muteCamera }));

    if (!user.id) return;

    dispatch(
      handleEventReducer({
        payload: {
          appointment_id: id,
          user_id: user.id,
          raised: controlls.handControl,
          camera: !!controlls.muteCamera,
          microphone: !controlls.muteMicrophone,
        },
        event: 'meeting-controlls',
      })
    );
  };

  const handleToggleS = () => {
    dispatch(toggleScreenSharingReducer());

    if (!user.id) return;

    dispatch(
      handleEventReducer({
        payload: {
          appointment_id: id,
          user_id: user.id,
          raised: controlls.handControl,
          camera: !controlls.muteCamera,
          microphone: !controlls.muteMicrophone,
          screenSharing: !screenSharing,
        },
        event: 'meeting-controlls',
      })
    );
  };

  const handleToggleMic = () => {
    dispatch(toggleMicReducer());
    setControlls((prev) => ({ ...prev, muteMicrophone: !prev.muteMicrophone }));

    if (!user.id) return;

    dispatch(
      handleEventReducer({
        payload: {
          appointment_id: id,
          user_id: user.id,
          raised: controlls.handControl,
          camera: !controlls.muteCamera,
          microphone: !!controlls.muteMicrophone,
          screenSharing,
        },
        event: 'meeting-controlls',
      })
    );
  };

  const toggleHandRaised = () => {
    if (!user.id) return;

    dispatch(
      handleEventReducer({
        payload: {
          appointment_id: id,
          user_id: user.id,
          raised: !controlls.handControl,
          camera: !controlls.muteCamera,
          microphone: !controlls.muteMicrophone,
          screenSharing,
        },
        event: 'meeting-controlls',
      })
    );

    setControlls((prev) => ({ ...prev, handControl: !prev.handControl }));
  };

  return (
    <div className="flex h-12 w-fit items-center justify-center gap-3 rounded-full bg-dark-secondary px-6 shadow-2xl">

      {/* {user?.role !== 'PATIENT' && user?.type !== 'PATIENT' && (
        <button title="Options" className="meeting-bar-btn ">
          <HiDotsVertical size={16} />
        </button>
      )} */}

      {/* Show Consultation Form button only for non-patient users */}
      {user?.role !== 'PATIENT' && user?.type !== 'PATIENT' && (
        <button
          onClick={() => setIsModalOpen(true)}
          title="Consultation Form"
          className="meeting-bar-btn"
        >
          <FaInfoCircle size={16} />
        </button>
      )}

      {user?.role !== 'PATIENT' && user?.type !== 'PATIENT' && (
        <button
          onClick={handleShowVitals}
          title="Patient Vitals"
          className="meeting-bar-btn"
        >
          <MdShowChart size={16} />
        </button>
      )}

      <button
        onClick={handleToggleMic}
        title="Microphone"
        className={twMerge(
          'meeting-bar-btn',
          controlls.muteMicrophone ? 'bg-dark-main' : 'theme-bg-color'
        )}
      >
        <FaMicrophone size={16} />
      </button>
      <button
        onClick={handleToggleCamera}
        title="Camera"
        className={twMerge(
          'meeting-bar-btn',
          controlls.muteCamera ? 'bg-dark-main' : 'theme-bg-color'
        )}
      >
        <MdCameraAlt size={16} />
      </button>
      <button
        onClick={handleToggleS}
        title="Share"
        className={twMerge(
          'meeting-bar-btn',
          !screenSharing ? 'bg-dark-main' : 'theme-bg-color'
        )}
      >
        <MdOutlineScreenShare size={16} />
      </button>
      <button
        onClick={toggleHandRaised}
        title="Raise Hand"
        className={twMerge(
          'meeting-bar-btn',
          !controlls.handControl ? 'bg-dark-main' : 'theme-bg-color'
        )}
      >
        <FaHandPaper size={16} />
      </button>
      <button
        onClick={handleCancelMeeting}
        title="Cancel Meeting"
        className="meeting-bar-btn bg-rose-500 hover:bg-rose-700"
      >
        <FaPhone size={16} />
      </button>
      {/* Modal */}
      <Modal isOpen={false} onClose={() => { }} id={id} />
    </div>
  );
};

export default Control;

export type { ControlPropsWithModal };

export { Modal };
