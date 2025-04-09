'use server';

import Appointment from '../components/Appointment'; // Import Appointment component
import { ServerGenerator } from '@common'; // Import ServerGenerator for server-side data rendering
import { getRequestedAppointments } from '@service'; // Import API function to fetch requested appointments

import type { ServerComponent } from '@types'; // Import the ServerComponent type for type-checking

// RequestedAppointments component definition
const RequestedAppointments: ServerComponent = async () => {
  // Fetch requested appointments from the API
  const res = await getRequestedAppointments();

  // If the API request fails, return an empty fragment
  if (!res.success) return <></>;

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
      {/* Section title */}
      <span className="-mt-2 text-base font-semibold text-gray-600 sm:text-lg lg:-mt-4 lg:text-xl">
        Requested Appointments
      </span>

      {/* Horizontal scroll container for appointment cards */}
      {/* <div className="hidescrollbar flex w-full items-center gap-4 overflow-x-auto py-4 sm:py-6"> */}
      <div className="flex w-full items-center gap-4 overflow-x-auto py-4 sm:py-6">

        {/* ServerGenerator component will iterate over fetched data and render Appointment components */}
        <ServerGenerator data={res.data}>
          <Appointment />
        </ServerGenerator>
      </div>
    </div>
  );
};

export default RequestedAppointments;
