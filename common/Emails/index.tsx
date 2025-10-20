'use client';

import { useEffect, useState } from 'react';
import { getEmailsHistory } from '@service';
import Table from './Table';

import type { FC } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const mainStyle = {
  transform: 'scale(0.67)',
  transformOrigin: 'top left',
  width: '150%',
  height: '150%',
  overflow: 'hidden',
};

const Emails: FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(10); // Items per page
  const [pagination, setPagination] = useState<any>(null); // For totalPages, etc.


  const loadEmails = async () => {
    try {
      setLoading(true);
      const res = await getEmailsHistory(page, limit);
      if (res.success) {
        setData(res.data.data ?? []);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadEmails();
  }, [page]);

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
    <div className="min-h-screen pb-24 md:pb-96 font-poppins flex w-full flex-col gap-6 px-10 pr-0 pt-6">
      <div className="flex w-full justify-between">
        <span className="screen-title">Email History</span>
      </div>
      <Table data={data} />
      {pagination && (
        <div className="md:static fixed bottom-0 left-0 right-0 bg-white md:bg-transparent z-30 py-4 md:py-7 shadow md:shadow-none">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={!pagination.hasPrevPage}
              className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <span className="text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
              disabled={!pagination.hasNextPage}
              className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
            >
              <FaArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emails;
