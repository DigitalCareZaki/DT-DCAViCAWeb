'use server';

import { PrimaryCounter } from '@common';

import { CgCalendar } from '@react-icons/all-files/cg/CgCalendar';
import { RiHeartPulseLine } from '@react-icons/all-files/ri/RiHeartPulseLine';
import { BiStopwatch } from '@react-icons/all-files/bi/BiStopwatch';
import { BiReceipt } from '@react-icons/all-files/bi/BiReceipt';
import { HiChartPie } from '@react-icons/all-files/hi/HiChartPie';
import { getTelemedCardsNo } from '@service';
import type { ServerComponent } from '@types';

const Widgets: any = async ({ data }: any) => {

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 px-4 py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-10">
      {/* Total Appointments */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-[#ccfbf1] p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <HiChartPie size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={data?.totalAppointments} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">
            Total Appointments
          </span>
        </div>
      </div>

      {/* Scheduled */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-[#ccfbf1] p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <CgCalendar size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={data?.scheduled} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">Scheduled</span>
        </div>
      </div>

      {/* Today Appointment */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-[#ccfbf1] p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <BiStopwatch size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={data?.active} />
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-semibold">Today Appointment</span>
        </div>
      </div>

      {/* Cancelled Appointments */}
      <div className="flex h-60 w-full flex-shrink flex-col justify-between rounded-lg bg-[#ccfbf1] p-4 py-6 text-gray-600">
        <div className="flex w-full items-center justify-between">
          <BiReceipt size={60} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600">
            <span>
              <PrimaryCounter prefix="" value={data?.cancelled} />
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
