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
    <div className="flex w-full flex-col gap-5 lg:flex-row">
      <div className="flex w-full flex-wrap justify-between gap-4">
        <div className="sp-counter flex-col gap-2 rounded-lg bg-gray-800 p-4 text-center sm:gap-4">
          <span className="text-4xl font-black text-white sm:text-6xl">
            <Link href="/superadmin/users?role=patient" passHref>
              <PrimaryCounter
                value={data.patients}
                prefix=""
              />
            </Link>
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Total Patients
          </span>
        </div>
        <div className="sp-counter flex-col gap-2 rounded-lg bg-gray-800 p-4 text-center sm:gap-4">
          <span className="text-4xl font-black text-white sm:text-6xl">
            <Link href="/superadmin/users?role=doctor" passHref>
              <PrimaryCounter
                value={data.doctors}
                prefix=""
              />
            </Link>
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Total Doctors
          </span>
        </div>
        <div className="sp-counter flex-col gap-2 rounded-lg bg-gray-800 p-4 text-center sm:gap-4">
          <span className="text-4xl font-black text-white sm:text-6xl">
            <Link href="/superadmin/users?role=nurse" passHref>
              <PrimaryCounter
                value={data.nurses}
                prefix=""
              />
            </Link>
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Total Nurses
          </span>
        </div>
        <div className="sp-counter flex-col gap-2 rounded-lg bg-gray-800 p-4 text-center sm:gap-4">
          <span className="text-4xl font-black text-white sm:text-6xl">
            <PrimaryCounter
              value={data.branches}
              prefix=""
            />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Total Branches
          </span>
        </div>
        <div className="sp-counter flex-col gap-2 rounded-lg bg-gray-800 p-4 text-center sm:gap-4">
          <span className="text-4xl font-black text-white sm:text-6xl">
            <PrimaryCounter
              value={data.medications}
              prefix=""
            />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Total Specialties
          </span>
        </div>
        <div className="sp-counter flex-col gap-2 rounded-lg bg-gray-800 p-4 text-center sm:gap-4">
          <span className="text-4xl font-black text-white sm:text-6xl">
            <PrimaryCounter
              value={data.appointments}
              prefix=""
            />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Total Appointments
          </span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;