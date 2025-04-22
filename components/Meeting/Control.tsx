'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
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
import type { ModalState } from '@store-types';
import { telemedReportValidator } from './validator';


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
        handleShowModal({
          type: 'ERROR',
          message: 'User token is missing',
          show: true,
        });
        return;
      }

      const payload = {
        appointmentId: id,
        observations: data?.observations,
        diagnosis: data?.diagnosis,
        medications: data?.prescribedMedications,
        procedure: data?.procedureRecommended,
        follow_up_date: data?.followupDate
      };

      const res = await fetch('https://avica.up.railway.app/api/v1/web/telemed/report', {
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
        handleShowModal({
          type: 'ERROR',
          message: result?.message ?? 'Something went wrong',
          show: true,
        });
        return;
      }

      // Show success modal
      handleShowModal({
        type: 'SUCCESS',
        message: result?.message ?? 'Report submitted successfully',
        show: true,
      });

    } catch (error: any) {
      console.error('Submit error:', error);
      handleShowModal({
        type: 'ERROR',
        message: error?.message ?? 'An unexpected error occurred',
        show: true,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white">
        {/* <h2 className="text-lg font-bold">Modal Title</h2> */}
        {/* <p>Meeting ID: {id}</p> */}

        <div className="rounded-xl bg-white p-4 relative">
          {/* Cancel Icon */}
          <button
            onClick={onClose} // Call the close function when clicked
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
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
          className="h-full w-full rounded-b-2xl text-lg"
        >
          <div className="flex h-fit w-full flex-col gap-3 rounded-2xl p-5">
            <div>
              <span className="text-xl font-semibold text-black">
                AViCA Teleconsultation Report
              </span>
            </div>
            <div className="flex w-full flex-col gap-4 p-4">
              <InputBasic
                name="observations"
                placeholder="Enter Observations"
                defaultBorder
                // inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 patient:focus-within:border-fuchsia-100 nurse:focus-within:border-fuchsia-100 border-transparent"
                inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
                label="Observations"
                // inputClassName="bg-transparent placeholder:text-fuchsia-200 text-fuchsia-100 text-lg"
                inputClassName="bg-transparent placeholder:text-gray-300 text-black text-lg px-2 py-1 focus:border-black"
                hideInfo
                labelClassName="text-black text-lg"
                hookProps={register('observations')}
                error={!!errors?.Observations}
                errorMessage={errors?.Observations}
                errorClassName="text-rose-200"
              />
              <InputBasic
                name="diagnosis"
                placeholder="Enter Diagnosis"
                defaultBorder
                // inputWrapperClassName="bg-fuchsia-400 doctor:focus-within:border-fuchsia-100 patient:focus-within:border-fuchsia-100 nurse:focus-within:border-fuchsia-100 border-transparent"
                inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
                label="Diagnosis"
                // inputClassName="bg-transparent placeholder:text-fuchsia-200 text-fuchsia-100 text-lg"
                inputClassName="bg-transparent placeholder:text-gray-300 text-black text-lg px-2 py-1 focus:border-black"
                hideInfo
                labelClassName="text-black text-lg"
                hookProps={register('diagnosis')}
                error={!!errors?.diagnosis}
                errorMessage={errors?.description}
                errorClassName="text-rose-200"
              />
              {/* </div> */}
              {/* <div className="flex w-full flex-col gap-4 p-4"> */}
              <InputBasic
                name="prescribedMedications"
                placeholder="Prescribed Medications"
                defaultBorder
                inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
                label="Prescribed Medications"
                inputClassName="bg-transparent placeholder:text-gray-300 text-black text-lg px-2 py-1 focus:border-black"
                hideInfo
                labelClassName="text-black text-lg"
                hookProps={register("prescribedMedications")}
                error={!!errors?.prescribedMedications}
                errorClassName="text-rose-200"
              />
              <InputBasic
                name="procedureRecommended"
                placeholder="Procedure Recommended"
                defaultBorder
                inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
                label="Procedure Recommended"
                inputClassName="bg-transparent placeholder:text-gray-300 text-black text-lg px-2 py-1 focus:border-black"
                hideInfo
                labelClassName="text-black text-lg"
                hookProps={register("procedureRecommended")}
                error={!!errors?.procedureRecommended}
                errorClassName="text-rose-200"
              />
              <InputBasic
                type='date'
                name="followupDate"
                placeholder="Follow Up Date"
                defaultBorder
                inputWrapperClassName="border border-gray-400 rounded-lg focus-within:border-black"
                label="Follow Up Date"
                inputClassName="bg-transparent placeholder:text-gray-300 text-black text-lg px-2 py-1 focus:border-black"
                hideInfo
                labelClassName="text-black text-lg"
                hookProps={register("followupDate")}
                error={!!errors?.followupDate}
                errorClassName="text-rose-200"
              />
              {/* </div> */}
              <div className="w-full mt-8">
                {/* <ButtonPrimary
                type="button"
                onClick={onClose}
                className="h-14 text-lg w-[60%] doctor:bg-fuchsia-500 patient:bg-fuchsia-500 nurse:bg-fuchsia-500"
                name="Close"
              // loading={loading}
              /> */}
                <ButtonPrimary
                  type="submit"
                  // className="h-14 text-lg w-[60%] doctor:bg-fuchsia-500 patient:bg-fuchsia-500 nurse:bg-fuchsia-500"
                  className="h-14 text-lg w-[50%] !mx-auto"
                  name="Submit"
                // loading={loading}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Control: ClientComponentProps<ControlProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user] = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const [controlls, setControlls] = useState({
    muteMicrophone: false,
    muteCamera: false,
    handControl: false,
    screenSharing: false,
  });

  const handleCancelMeeting = () => {
    router.push('/doctor/telemed');
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
    setControlls((prev) => ({ ...prev, screenSharing: !prev.screenSharing }));

    if (!user.id) return;

    dispatch(
      handleEventReducer({
        payload: {
          appointment_id: id,
          user_id: user.id,
          raised: controlls.handControl,
          camera: !controlls.muteCamera,
          microphone: !controlls.muteMicrophone,
          screenSharing: !!controlls.screenSharing,
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
          screenSharing: !controlls.screenSharing,
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
          screenSharing: !!controlls.screenSharing,
        },
        event: 'meeting-controlls',
      })
    );

    setControlls((prev) => ({ ...prev, handControl: !prev.handControl }));
  };

  return (
    <div className="flex h-12 w-fit items-center justify-center gap-3 rounded-full bg-dark-secondary px-6 shadow-2xl">
      <button title="Options" className="meeting-bar-btn ">
        <HiDotsVertical size={16} />
      </button>

      {/* New Button for Modal */}
      <button
        // onClick={handleShowVitals}
        // title="Patient Vitals"
        onClick={() => setIsModalOpen(true)}
        title="More Info"
        className="meeting-bar-btn"
      >
        {/* <MdShowChart size={16} /> */}
        <FaInfoCircle size={16} />
      </button>

      <button
        onClick={handleShowVitals}
        title="Patient Vitals"
        className="meeting-bar-btn"
      >
        <MdShowChart size={16} />
      </button>



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
          !controlls.screenSharing ? 'bg-dark-main' : 'theme-bg-color'
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
    </div>
  );
};

export default Control;
