'use client';

import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

import type { TableProps, GraphResult } from './types';
import type { ClientComponentProps } from '@types';

const Donut = dynamic(() => import('./Chart'), {
  ssr: false,
});

const Charts: ClientComponentProps<TableProps> = ({ data }) => {
  const [result, setResult] = useState<GraphResult>({
    admin: {
      active: 0,
      unactive: 0,
      total: 0,
    },
    doctor: {
      active: 0,
      unactive: 0,
      total: 0,
    },
    nurse: {
      active: 0,
      unactive: 0,
      total: 0,
    },
    patient: {
      active: 0,
      unactive: 0,
      total: 0,
    },
  });

  useEffect(() => {
    const newResult: GraphResult = {
      admin: { active: 0, unactive: 0, total: 0 },
      doctor: { active: 0, unactive: 0, total: 0 },
      nurse: { active: 0, unactive: 0, total: 0 },
      patient: { active: 0, unactive: 0, total: 0 },
    };

    data.forEach((user) => {
      const role = user.role.toLowerCase();
      const isActive = user.active ?? false;

      if (role in newResult) {
        if (isActive) {
          newResult[role as keyof GraphResult].active++;
        } else {
          newResult[role as keyof GraphResult].unactive++;
        }

        newResult[role as keyof GraphResult].total++;
      }
    });

    setResult(newResult);

    return () => {};
  }, [data]);

  return (
    <div className="flex w-full flex-row items-center justify-around gap-4 rounded-2xl border bg-white px-4 py-6 superadmin:border-theme-superadmin-primary admin:border-theme-admin-primary">
      <Donut
        title="Admins"
        values={[result.admin.active, result.admin.unactive]}
        total={result.admin.total}
      />
      <Donut
        title="Doctors"
        values={[result.doctor.active, result.doctor.unactive]}
        total={result.doctor.total}
      />
      <Donut
        title="Nurses"
        values={[result.nurse.active, result.nurse.unactive]}
        total={result.nurse.total}
      />
      <Donut
        title="Patients"
        values={[result.patient.active, result.patient.unactive]}
        total={result.patient.total}
      />
    </div>
  );
};

export default Charts;
