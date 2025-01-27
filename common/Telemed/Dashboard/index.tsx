'use server';

import { Suspense } from 'react';

import Widgets from './components/Widgets';
import Header from './components/Header';
import MyAppointments from './MyAppointments';
import MyAppointmentsSkeleton from './MyAppointments/Sekeleton';
import RequestedAppointments from './RequestedAppointments';
import RequestedAppointmentsSkeleton from './RequestedAppointments/Skeleton';
import { getUser } from '@actions';
import type { ServerComponent } from '@types';
import {
  PrimaryHeader,
} from '@common';
import { BiLoaderAlt } from 'react-icons/bi';

const Dashboard: ServerComponent = async () => {
  const user = await getUser();
  return (
    <div className="hidescrollbar flex !h-full w-full flex-col gap-6 !overflow-y-scroll px-4">
      {/* Conditionally render PrimaryHeader only if user is defined */}
      {user ? (
        <PrimaryHeader user={user as any} />
      ) : (
        <BiLoaderAlt />
      )}

      <Widgets />

      <Suspense fallback={<RequestedAppointmentsSkeleton />}>
        <RequestedAppointments />
      </Suspense>

      <Suspense fallback={<MyAppointmentsSkeleton />}>
        <MyAppointments />
      </Suspense>
    </div>
  );
};

export default Dashboard;
