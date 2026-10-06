'use server';

import { Suspense } from 'react';

import Widgets from './components/Widgets';
import Header from './components/Header';
import MyAppointments from './MyAppointments';
import MyAppointmentsSkeleton from './MyAppointments/Sekeleton';
import RequestedAppointments from './RequestedAppointments';
import RequestedAppointmentsSkeleton from './RequestedAppointments/Skeleton';
import RefreshOnRestore from './RefreshOnRestore';
import RefreshOnAppointmentUpdate from './RefreshOnAppointmentUpdate';
import { getUser } from '@actions';
import { getTelemedCardsNo } from '@service';
import type { ServerComponent } from '@types';
import {
  PrimaryHeader,
} from '@common';
import { BiLoaderAlt } from 'react-icons/bi';

const Dashboard: ServerComponent = async () => {

  const user = await getUser();

  const res = await getTelemedCardsNo();
  if (!res.success) return <></>;


  return (
    <div className="hidescrollbar flex !h-full w-full flex-col gap-6 !overflow-y-scroll px-4">
      <RefreshOnRestore />
      <RefreshOnAppointmentUpdate />
      {/* Conditionally render PrimaryHeader only if user is defined */}
      {/* {user ? (
        <PrimaryHeader user={user as any} />
      ) : (
        <BiLoaderAlt />
      )} */}

      <Widgets data={res?.data} />

      <Suspense fallback={<RequestedAppointmentsSkeleton />}>
        <RequestedAppointments pending={true} />
      </Suspense>

      {/* <Suspense fallback={<MyAppointmentsSkeleton />}>
        <MyAppointments />
      </Suspense> */}
    </div>
  );
};

export default Dashboard;
