'use server';

import { ServerGenerator } from '@common'; // Import ServerGenerator to render data on the server-side
import { getSelfAppointments } from '@service'; // Import function to fetch appointments data

import MeetingWidget from '../components/MeetingWidget'; // Import the MeetingWidget component to display each appointment

import type { ServerComponentProps } from '@types'; // Import the type for component props

// MyAppointments component definition
const MyAppointments: ServerComponentProps<any> = async () => {
  // Fetch user's appointments from the service
  const data = await getSelfAppointments();

  // If fetching the data fails, display a "No Data" message
  if (!data.success) return <>No Data</>;

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Background abstract SVG decoration */}
      <div className="abstract-svg opacity absolute left-0 top-0 h-full w-full rounded-lg"></div>

      {/* Section Title */}
      <span className="z-20 text-xl font-bold uppercase text-fuchsia-200 sm:text-2xl">
        Appointments
      </span>

      {/* Grid layout for displaying appointments */}
      <div className="z-20 grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* ServerGenerator will iterate over the data and render MeetingWidget components for each appointment */}
        <ServerGenerator data={data.data}>
          <MeetingWidget />
        </ServerGenerator>
      </div>
    </div>
  );
};

export default MyAppointments;
