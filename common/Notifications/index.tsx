'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PageInfo } from '@common';
import { getNotifications } from '@service';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { setNotificationsReducer, setNotificationsReadReducer } from '@slice';
import Table from './Table';
import type { NotificationProps } from '@types';


const Notifications = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState<NotificationProps[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);

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
