"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { ClientGenerator } from "@common";
import Topbar from "./Topbar";
import Patient from "../components/Appointment";
import { getRequestedAppointments, getUser } from '@service';
import type { UserRole } from "@types";
import PatientLoader from "../../../Loader/PatientLoader";

import type { AppointmentFilters } from "./types";

const initialFilters: AppointmentFilters = { search: '', date: '' };

const MeetingsClient = ({ userType }: { userType: UserRole | null }) => {

  const [appointments, setAppointments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState<AppointmentFilters>(initialFilters);
  // Only the latest request may update the list, so a slow stale response can't overwrite newer results
  const latestRequest = useRef(0);

  useEffect(() => {
    getUser().then((userRes) => setUser(userRes || null));
  }, []);

  // Debounce typing so the API is only hit once the user pauses
  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim();
      setFilters((prev) => (prev.search === search ? prev : { ...prev, search }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Empty filters are dropped by the service, so no filters returns all appointments
  useEffect(() => {
    const requestId = ++latestRequest.current;
    setFetching(true);

    getRequestedAppointments({ pending: false, ...filters })
      .then((res) => {
        if (requestId !== latestRequest.current) return;
        setAppointments(res.success && Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        if (requestId === latestRequest.current) setAppointments([]);
      })
      .finally(() => {
        if (requestId !== latestRequest.current) return;
        setFetching(false);
        setLoading(false);
      });
  }, [filters]);

  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFilters((prev) => ({ ...prev, date }));
  };

  const clearDate = () => {
    setFilters((prev) => ({ ...prev, date: '' }));
  };

  // Clear the applied search right away instead of waiting for the debounce
  const clearSearch = () => {
    setSearchInput('');
    setFilters((prev) => (prev.search ? { ...prev, search: '' } : prev));
  };

  const clearFilters = () => {
    setSearchInput('');
    setFilters(initialFilters);
  };

  const hasFilters = !!(searchInput.trim() || filters.date);
  const searching = fetching || searchInput.trim() !== filters.search;

  if (loading) {
    return <PatientLoader />;
  }

  return (
    <div className="relative flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
      {/* <PrimaryHeader user={user as any} /> */}
      <Topbar
        userType={userType as UserRole}
        search={searchInput}
        onSearch={(e) => setSearchInput(e.target.value)}
        onClearSearch={clearSearch}
        loading={searching}
        date={filters.date}
        onDateChange={onDateChange}
        onClearDate={clearDate}
      />
      {appointments.length > 0 ? (
        <div
          className={twMerge(
            "grid w-full grid-cols-4 flex-wrap gap-4 transition-opacity 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5",
            fetching && "opacity-60"
          )}
        >
          <ClientGenerator data={appointments} dynamicWidth>
            <Patient />
          </ClientGenerator>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-20 text-sm font-medium text-gray-500">
          {hasFilters ? 'No appointments match your filters.' : 'No appointments found.'}
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="theme-text-color font-semibold hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
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
