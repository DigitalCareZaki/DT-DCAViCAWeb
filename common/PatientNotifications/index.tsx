'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPatientNotifications } from '@service';
import { setNotificationsReducer, setNotificationsReadReducer } from '@slice';

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

const PatientNotification: FC<PatientNotificationProps> = ({ patient }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!patient) return;

      try {
        setLoading(true);
        const res = await getPatientNotifications(patient);

        if (res.success) {
          setData(res.data ?? []);
          dispatch(setNotificationsReducer({ data: res.data ?? [] }));
          dispatch(setNotificationsReadReducer());
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [patient, dispatch]);

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
        <span className="screen-title">Notifications</span>
      </div>
      <Table data={data} />
    </div>
  );
};

export default PatientNotification;
