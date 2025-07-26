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
      <Link href="/admin/users?role=patient" passHref>
        <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r bg-[#8697fa] shadow-md hover:shadow-lg transition-shadow gap-1">
          <span className="text-white text-3xl font-extrabold flex items-center gap-2">
            <Icon name="FaRegUser" size={24} className="text-white" />
            <PrimaryCounter value={data.success ? data.data.patients : 0} prefix="" />
          </span>
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            Total Patients
          </span>
        </div>
      </Link>
      {/* Doctors */}
      <Link href="/admin/users?role=doctor" passHref>
        <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r bg-[#8697fa] shadow-md hover:shadow-lg transition-shadow gap-1">
          <span className="text-white text-3xl font-extrabold flex items-center gap-2">
            <Icon name="FaUserDoctor" size={24} className="text-white" />
            <PrimaryCounter value={data.success ? data.data.doctors : 0} prefix="" />
          </span>
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            Total Doctors
          </span>
        </div>
      </Link>

      {/* Nurses */}
      <Link href="/admin/users?role=nurse" passHref>
        <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r bg-[#8697fa] shadow-md hover:shadow-lg transition-shadow gap-1">
          <span className="text-white text-3xl font-extrabold flex items-center gap-2">
            <Icon name="RiNurseFill" size={24} className="text-white" />
            <PrimaryCounter value={data.success ? data.data.nurses : 0} prefix="" />
          </span>
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            Total Nurses
          </span>
        </div>
      </Link>

      {/* Departments / Specialties */}
      <Link href="/admin/departments" passHref>
        <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r bg-[#8697fa] shadow-md hover:shadow-lg transition-shadow gap-1">
          <span className="text-white text-3xl font-extrabold flex items-center gap-2">
            <Icon name="MdPin" size={24} className="text-white" />
            <PrimaryCounter value={data.success ? data.data.departments : 0} prefix="" />
          </span>
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            Total Departments / Specialties
          </span>
        </div>
      </Link>

      {/* Medications */}
      <Link href="/admin/settings/medications" passHref>
        <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r bg-[#8697fa] shadow-md hover:shadow-lg transition-shadow gap-1">
          <span className="text-white text-3xl font-extrabold flex items-center gap-2">
            <Icon name="MdMergeType" size={24} className="text-white" />
            <PrimaryCounter value={data.success ? data.data.medications : 0} prefix="" />
          </span>
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            Total Medications
          </span>
        </div>
      </Link>

      {/* Appointments */}
      <Link href="/admin/#" passHref>
        <div className="flex min-h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-r bg-[#8697fa] shadow-md hover:shadow-lg transition-shadow gap-1">
          <span className="text-white text-3xl font-extrabold flex items-center gap-2">
            <Icon name="FaCalendarAlt" size={24} className="text-white" />
            <PrimaryCounter value={data.success ? data.data.appointments : 0} prefix="" />
          </span>
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            Total Appointments
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Analytics;
