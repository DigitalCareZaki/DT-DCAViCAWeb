import { DoctorTelemedMeetings } from '@components';
import { Metadata } from 'next';
import { getUserTypeHeaders } from '@actions';
import { getRequestedAppointments, getUser } from '@service';
import { PrimaryHeader, ServerGenerator } from '@common';
import { BiLoaderAlt } from 'react-icons/bi';
import Topbar from './Topbar';
import type { ServerComponent, UserRole } from '@types';
import Patient from '../../../../common/Telemed/Dashboard/components/Appointment';
export default async function Page() {

  const userType = await getUserTypeHeaders();
  const res = await getRequestedAppointments();

  if (!res.success) return <></>;
  const user = await getUser();


  return (
    // <main className="h-full w-full">
    <div className=" flex h-full w-full flex-col gap-6 px-4">

      {/* {user ? (
        <PrimaryHeader user={user as any} />
      ) : (
        <BiLoaderAlt />
      )} */}
      <Topbar userType={userType as UserRole} />
      <div className="grid w-full grid-cols-4 flex-wrap gap-4 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5">
        <ServerGenerator data={res.data} dynamicWidth>
          <Patient />
        </ServerGenerator>
      </div>

      {/* <DoctorTelemedMeetings /> */}
    </div>

    // </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor TeleMed',
  description: 'Avica | Doctor TeleMed',
};
