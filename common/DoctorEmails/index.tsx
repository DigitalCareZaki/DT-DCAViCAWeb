'use client';

import { useEffect, useState } from 'react';
import { getDoctorEmailsHistory } from '@service';
import Table from './Table';

import type { FC } from 'react';

const mainStyle = {
  transform: 'scale(0.67)',
  transformOrigin: 'top left',
  width: '150%',
  height: '150%',
  overflow: 'hidden',
};

const DoctorEmails: FC<{ patient: string }> = ({ patient }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadDoctorEmails = async () => {
      if (!patient) return;

      try {
        setLoading(true);
        const res = await getDoctorEmailsHistory(patient);
        if (res.success) {
          setData(res.data ?? []);
        }
      } catch (error) {
        console.error('Error loading doctor emails:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDoctorEmails();
  }, [patient]);

  if (loading) return <div
    style={mainStyle}
    className="flex h-full w-screen items-center justify-center bg-background"
  >
    <div
      className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    ></div>
  </div>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <div className="flex w-full justify-between">
        <span className="screen-title">Emails History</span>
      </div>
      <Table data={data} />
    </div>
  );
};

export default DoctorEmails;
