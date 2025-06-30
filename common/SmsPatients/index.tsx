'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPatientsSms } from '@service';

import Table from './Table';

import type { FC } from 'react';

type PatientNotificationProps = {
  patient: any; // Replace `any` with the proper type if you know it
};

const mainStyle = {
  transform: 'scale(0.67)', // Scales the layout to 67%
  transformOrigin: 'top left', // Keeps scaling origin at the top left corner
  width: '150%', // Compensates for scaling width
  height: '150%', // Compensates for scaling height
  overflow: 'hidden', // Prevents overflow due to scaling
};

const SmsPatients: FC<PatientNotificationProps> = ({ patient }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadSms = async () => {
      if (!patient) return;

      try {
        setLoading(true);
        const res = await getPatientsSms(patient);

        if (res.success) {
          setData(res.data ?? []);
        }
      } catch (error) {
        console.error('Error loading SMS:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSms();
  }, [patient]);

  if (loading) return <div
    style={mainStyle} // Apply the zoom-out effect here
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
        <span className="screen-title">SMS History</span>
      </div>
      <Table data={data} />
    </div>
  );
};

export default SmsPatients;
