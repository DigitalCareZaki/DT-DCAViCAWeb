'use server';

import { PrimaryCounter } from '@common';
import { getSuperAdminStats, getUser } from '@service';

import type { ServerComponent } from '@types';
import Link from 'next/link';

const Analytics: ServerComponent = async () => {
  const user = await getUser();
  const res = await getSuperAdminStats(user?.role ?? 'superadmin');
  if (!res.success) return <></>;

  const data = res.data;

  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-1 flex-col items-center justify-center h-32 bg-gradient-to-b from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3">
        <span className="text-xl font-black text-white sm:text-3xl">
          <Link href="/superadmin/users?role=patient" passHref>
            <PrimaryCounter
              value={data.patients}
              prefix=""
            />
          </Link>
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-90">
          Total Patients
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center h-32 bg-gradient-to-b from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3">
        <span className="text-xl font-black text-white sm:text-3xl">
          <Link href="/superadmin/users?role=doctor" passHref>
            <PrimaryCounter
              value={data.doctors}
              prefix=""
            />
          </Link>
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-90">
          Total Doctors
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center h-32 bg-gradient-to-b from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3">
        <span className="text-xl font-black text-white sm:text-3xl">
          <Link href="/superadmin/users?role=nurse" passHref>
            <PrimaryCounter
              value={data.nurses}
              prefix=""
            />
          </Link>
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-90">
          Total Nurses
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center h-32 bg-gradient-to-b from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3">
        <span className="text-xl font-black text-white sm:text-3xl">
          <PrimaryCounter
            value={data.branches}
            prefix=""
          />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-90">
          Total Branches
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center h-32 bg-gradient-to-b from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3">
        <span className="text-xl font-black text-white sm:text-3xl">
          <PrimaryCounter
            value={data.medications}
            prefix=""
          />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-90">
          Total Specialties
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center h-32 bg-gradient-to-b from-green-400 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-3">
        <span className="text-xl font-black text-white sm:text-3xl">
          <PrimaryCounter
            value={data.appointments}
            prefix=""
          />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-90">
          Total Appointments
        </span>
      </div>
    </div>
  );
};

export default Analytics;