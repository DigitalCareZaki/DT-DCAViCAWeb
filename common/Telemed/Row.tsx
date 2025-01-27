'use client';

import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { FaPhone } from '@react-icons/all-files/fa/FaPhone';
import { FaStopwatch } from '@react-icons/all-files/fa/FaStopwatch';
import { TiCancel } from '@react-icons/all-files/ti/TiCancel';
import { IoEye } from '@react-icons/all-files/io5/IoEye';

import { InputSelect } from '@common';
import { toggleDoctorAppointmentReducer } from '@slice';
import { useUser } from '@selectors';
import { getName } from '@init-globals';

import type { ClientComponentProps, AppointmentProps } from '@types';

const Row: ClientComponentProps<AppointmentProps> = (data) => {
  const [user] = useUser();
  const dispatch = useDispatch();

  const handleInititeCall = () => dispatch(toggleDoctorAppointmentReducer());

  return (
    <tr className="border-b odd:bg-white even:bg-gray-50">
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
      >
        <InputSelect theme />
      </th>
      <td className="px-6 py-4">{data.title}</td>
      <td className="px-6 py-4">
        {data.participants?.length ? getName({ ...data.participants[0] }) : ''}
      </td>
      <td className="px-6 py-4">{new Date(data.start_date).toDateString()}</td>
      <td className="px-6 py-4">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-theme-doctor-primary" />
          <div className="absolute h-4 w-4 animate-ping rounded-full bg-theme-doctor-primary/40" />
        </div>
      </td>
      <td className="px-6 py-4">{data.type}</td>
      <td className="px-6 py-4">{new Date(data.end_date).toDateString()}</td>
      <td className="px-6 py-4">{data.description}</td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 font-medium text-white hover:underline">
          <Link
            passHref
            href={`/${user?.type?.toLowerCase() ?? ''}/telemed/view/2`}
          >
            <div
              title="View Appointment"
              className="w-fit cursor-pointer rounded-full bg-t-color-primary p-1 transition duration-300 hover:scale-110"
            >
              <IoEye size={14} />
            </div>
          </Link>
          <div
            title="Attend Appointment"
            onClick={handleInititeCall}
            className="w-fit cursor-pointer rounded-full bg-t-color-secondary p-1 transition duration-300 hover:scale-110"
          >
            <FaPhone size={14} />
          </div>
          <div
            title="Reschedule Appointment"
            className="w-fit cursor-pointer rounded-full bg-yellow-500 p-1 transition duration-300 hover:scale-110"
          >
            <FaStopwatch size={14} />
          </div>
          <div
            title="Cancel Appointment"
            className="w-fit cursor-pointer rounded-full bg-rose-500 p-1 transition duration-300 hover:scale-110"
          >
            <TiCancel size={14} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Row;
