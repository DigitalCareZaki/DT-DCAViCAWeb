'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { getPatientNotifications } from '@service';
import { setNotificationsReducer, setNotificationsReadReducer } from '@slice';

import Table from './Table';
import type { PaginationData } from './types';

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
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const loadNotifications = async () => {
    if (!patient) return;

    try {
      setLoading(true);
      const res = await getPatientNotifications(patient, page, limit);

      if (res.success) {
        setData(res.data?.notifications ?? res.data ?? []);

        // Handle pagination data from backend response
        if (res.data?.pagination) {
          setPagination(res.data.pagination);
        } else if (res.data?.totalPages || res.data?.total) {
          // Fallback pagination calculation if backend doesn't provide pagination object
          const totalItems = res.data.total || res.data.length || 0;
          const totalPages = res.data.totalPages || Math.ceil(totalItems / limit);

          setPagination({
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          });
        } else {
          // Default pagination if no pagination data is provided
          setPagination({
            currentPage: page,
            totalPages: 1,
            totalItems: res.data?.length || 0,
            itemsPerPage: limit,
            hasNextPage: false,
            hasPrevPage: false,
          });
        }

        dispatch(setNotificationsReducer({ data: res.data?.notifications ?? res.data ?? [] }));
        dispatch(setNotificationsReadReducer());
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [patient, page]);

  if (loading && !data.length) return <div
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
      {pagination && (
        <div className="flex items-center justify-center gap-4 py-7">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={!pagination.hasPrevPage}
            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700 " />
          </button>

          <span className="text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
            disabled={!pagination.hasNextPage}
            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
          >
            <FaArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientNotification;
