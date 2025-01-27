'use server';

import { getUserTypeHeaders } from '@actions';
import { getRequestedAppointments, getUser } from '@service';
import { PrimaryHeader, ServerGenerator } from '@common';

import Header from '../components/Header';
import Patient from '../components/Appointment';
import Topbar from './Topbar';

import type { ServerComponent, UserRole } from '@types';
import { BiLoaderAlt } from 'react-icons/bi';

const Meetings: ServerComponent = async () => {
  const userType = await getUserTypeHeaders();
  const res = await getRequestedAppointments();

  if (!res.success) return <></>;
  const user = await getUser();
  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
      {user ? (
        <PrimaryHeader user={user as any} />
      ) : (
        <BiLoaderAlt />
      )}
      <Topbar userType={userType as UserRole} />
      <div className="grid w-full grid-cols-4 flex-wrap gap-4 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5">
        <ServerGenerator data={res.data} dynamicWidth>
          <Patient />
        </ServerGenerator>
      </div>
    </div>
  );
};

export default Meetings;
