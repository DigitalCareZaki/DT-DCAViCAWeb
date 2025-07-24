'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PageInfo } from '@common';
import { getNotifications } from '@service';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { setNotificationsReducer, setNotificationsReadReducer } from '@slice';
import Table from './Table';
import type { NotificationProps } from '@types';

const mainStyle = {
  transform: 'scale(0.67)',
  transformOrigin: 'top left',
  width: '150%',
  height: '150%',
  overflow: 'hidden',
};


const Notifications = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState<NotificationProps[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      const res = await getNotifications(page, limit);
      if (res.success) {
        setData(res.data.data);
        setPagination(res.data.pagination);

        // Redux: Update store
        dispatch(setNotificationsReducer({ data: { data: res.data.data, pagination: res.data.pagination } }));
        dispatch(setNotificationsReadReducer());
      }
      setLoading(false);
    };

    loadNotifications();
  }, [page, dispatch]);

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
    <div className="h-screen pb-96 font-poppins">
      <div className="flex w-full justify-between">
        <span className="screen-title">Notifications</span>
      </div>
      {/* <PageInfo /> */}
      {/* <Header /> */}
      <Table data={data ?? []} pagination={pagination} />
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

export default Notifications;
