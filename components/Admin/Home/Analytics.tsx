'use server';

import { PrimaryCounter } from '@common';
import { getSuperAdminStats, getUser } from '@service';

import type { ServerComponent } from '@types';
import Link from 'next/link';
import Icon from '../../../common/Icon/Icon';

const Analytics: ServerComponent = async () => {
  const user = await getUser();
  const data = await getSuperAdminStats(user?.role ?? 'superadmin');

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* Patients */}
      <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-lg transition-shadow gap-1">
        <span className="text-white text-3xl font-extrabold flex items-center gap-2">
          <Icon name="FaRegUser" size={24} className="text-white" />
          <Link href="/admin/users?role=patient" passHref>
            <PrimaryCounter value={data.success ? data.data.patients : 0} prefix="" />
          </Link>
        </span>
        <span className="text-indigo-100 text-xs font-medium tracking-wide uppercase">
          Total Patients
        </span>
      </div>
      {/* Doctors */}
      <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:shadow-lg transition-shadow gap-1">
        <span className="text-white text-3xl font-extrabold flex items-center gap-2">
          <Icon name="FaUserDoctor" size={24} className="text-white" />
          <Link href="/admin/users?role=doctor" passHref>
            <PrimaryCounter value={data.success ? data.data.doctors : 0} prefix="" />
          </Link>
        </span>
        <span className="text-blue-100 text-xs font-medium tracking-wide uppercase">
          Total Doctors
        </span>
      </div>
      {/* Nurses */}
      <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-blue-400 shadow-md hover:shadow-lg transition-shadow gap-1">
        <span className="text-white text-3xl font-extrabold flex items-center gap-2">
          <Icon name="RiNurseFill" size={24} className="text-white" />
          <Link href="/admin/users?role=nurse" passHref>
            <PrimaryCounter value={data.success ? data.data.nurses : 0} prefix="" />
          </Link>
        </span>
        <span className="text-green-100 text-xs font-medium tracking-wide uppercase">
          Total Nurses
        </span>
      </div>
      {/* Branches */}
      <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-400 shadow-md hover:shadow-lg transition-shadow gap-1">
        <span className="text-white text-3xl font-extrabold flex items-center gap-2">
          <Icon name="MdPin" size={24} className="text-white" />
          <PrimaryCounter value={data.success ? data.data.branches : 0} prefix="" />
        </span>
        <span className="text-purple-100 text-xs font-medium tracking-wide uppercase">
          Total Branches
        </span>
      </div>
      {/* Specialties */}
      <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 shadow-md hover:shadow-lg transition-shadow gap-1">
        <span className="text-white text-3xl font-extrabold flex items-center gap-2">
          <Icon name="MdMergeType" size={24} className="text-white" />
          <PrimaryCounter value={data.success ? data.data.medications : 0} prefix="" />
        </span>
        <span className="text-yellow-100 text-xs font-medium tracking-wide uppercase">
          Total Specialties
        </span>
      </div>
      {/* Appointments */}
      <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 shadow-md hover:shadow-lg transition-shadow gap-1">
        <span className="text-white text-3xl font-extrabold flex items-center gap-2">
          <Icon name="FaCalendarAlt" size={24} className="text-white" />
          <PrimaryCounter value={data.success ? data.data.appointments : 0} prefix="" />
        </span>
        <span className="text-pink-100 text-xs font-medium tracking-wide uppercase">
          Total Appointments
        </span>
      </div>
    </div>
  );
};

export default Analytics;
