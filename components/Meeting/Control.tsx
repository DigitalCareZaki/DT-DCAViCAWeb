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

import {
  toggleDoctorAppointmentPatientVitalsReducer,
  toggleMicReducer,
  toggleCameraReducer,
  handleEventReducer,
  toggleScreenSharingReducer,
} from '@slice';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import type { ControlProps } from './types';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Control: ClientComponentProps<ControlProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user] = useUser();

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
    </div>
  );
};

export default Control;
