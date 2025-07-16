"use client";

import { useEffect, useState } from "react";
import { PrimaryHeader, ClientGenerator } from "@common";
import Topbar from "./Topbar";
import Patient from "../components/Appointment";
import { getRequestedAppointments, getUser } from '@service';
import type { UserRole } from "@types";
import { BiLoaderAlt } from "react-icons/bi";

async function fetchAppointments() {
  const appointmentsRes = await getRequestedAppointments();
  return appointmentsRes;
}

async function fetchUser() {
  const userRes = await getUser();
  return userRes;
}

const MeetingsClient = ({ userType }: { userType: UserRole | null }) => {

  const [appointments, setAppointments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // setLoading(true);
      const [appointmentsRes, userRes] = await Promise.all([
        fetchAppointments(),
        fetchUser(),
      ]);
      setAppointments(appointmentsRes.data || []);
      setUser(userRes || null);
      // setLoading(false);
    }
    loadData();
  }, []);


  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4 relative">
      {user ? <PrimaryHeader user={user as any} /> : <BiLoaderAlt />}
      <Topbar userType={userType as UserRole} />
      {/* Show a small loader in the top-right corner if loading, but keep the list visible */}
      {/* {loading && (
        <div className="absolute top-2 right-2 z-10">
          <BiLoaderAlt />
        </div>
      )} */}
      <div className="grid w-full grid-cols-4 flex-wrap gap-4 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5">
        <ClientGenerator data={appointments} dynamicWidth>
          <Patient />
        </ClientGenerator>
      </div>
    </div>
  );
};

export default MeetingsClient;




// 'use server';

// import { getUserTypeHeaders } from '@actions';
// import { getRequestedAppointments, getUser } from '@service';
// import { PrimaryHeader, ServerGenerator } from '@common';

// import Header from '../components/Header';
// import Patient from '../components/Appointment';
// import Topbar from './Topbar';

// import type { ServerComponent, UserRole } from '@types';
// import { BiLoaderAlt } from 'react-icons/bi';

// const Meetings: ServerComponent = async () => {
//   const userType = await getUserTypeHeaders();
//   const res = await getRequestedAppointments();

//   if (!res.success) return <></>;
//   const user = await getUser();
//   return (
//     <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
//       {user ? (
//         <PrimaryHeader user={user as any} />
//       ) : (
//         <BiLoaderAlt />
//       )}
//       <Topbar userType={userType as UserRole} />
//       <div className="grid w-full grid-cols-4 flex-wrap gap-4 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5">
//         <ServerGenerator data={res.data} dynamicWidth>
//           <Patient />
//         </ServerGenerator>
//       </div>
//     </div>
//   );
// };

// export default Meetings;
