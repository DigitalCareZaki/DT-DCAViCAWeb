'use server';

import { PrimaryCounter } from '@common';

import { CgCalendar } from '@react-icons/all-files/cg/CgCalendar';
import { RiHeartPulseLine } from '@react-icons/all-files/ri/RiHeartPulseLine';
import { BiStopwatch } from '@react-icons/all-files/bi/BiStopwatch';
import { BiReceipt } from '@react-icons/all-files/bi/BiReceipt';
import { HiChartPie } from '@react-icons/all-files/hi/HiChartPie';

import type { ServerComponent } from '@types';

const Widgets: ServerComponent = async () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 px-4 py-10">
      {/* Total Appointments */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-fuchsia-200 p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <HiChartPie size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={1} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">
            Total Appointments
          </span>
        </div>
      </div>

      {/* Scheduled */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-yellow-200 p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <CgCalendar size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={1} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">Scheduled</span>
        </div>
      </div>

      {/* Patients */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-green-200 p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <RiHeartPulseLine size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={1} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">Patients</span>
        </div>
      </div>

      {/* Today Appointment */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-blue-200 p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <BiStopwatch size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={0} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">Today Appointment</span>
        </div>
      </div>

      {/* Reports */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-orange-200 p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <BiReceipt size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={0} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">Reports</span>
        </div>
      </div>

      {/* Cancelled Appointments */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-rose-200 p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <BiReceipt size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={0} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">
            Cancelled Appointments
          </span>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
