'use client';
import React, { useState, useEffect } from 'react';
import { PageInfo } from '@common';
import { getSmsHistory } from '@service';

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

const SmsHistory: FC = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState<number>(10); // Items per page (sync with server if provided)
  const [pagination, setPagination] = useState<any>(null); // For totalPages, etc.


  const loadSms = async () => {
    try {
      setLoading(true);
      const res = await getSmsHistory(page, limit);
      if (res.success) {
        const rows = res.data.data ?? [];
        const pag = res.data.pagination;

        setData(rows);
        setPagination(pag);

        // Sync client limit with server perPage if provided
        const serverPerPage = pag?.perPage;
        if (serverPerPage && serverPerPage !== limit) {
          setLimit(Number(serverPerPage));
        }

        // If server says there are pages but this page returned no rows,
        // adjust the client page to the server-reported current/last page.
        if ((rows.length === 0 || rows == null) && page > 1) {
          const serverCurrent = pag?.currentPage ?? null;
          const serverTotal = pag?.totalPages ?? null;

          // Prefer serverCurrent if provided, otherwise use last page (totalPages)
          const fallback = serverCurrent || serverTotal || 1;
          if (fallback !== page) {
            setPage(Number(fallback));
            return; // avoid further processing — useEffect will re-run load
          }
        }
      }
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadSms();
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
    <div className="flex h-full w-full flex-col gap-4 px-10 pr-0 pt-4">
      <div className="flex w-full justify-between">
        <span className="screen-title">Sms History</span>
      </div>
      <Table data={data} />
      {pagination && (
        <div className="flex items-center justify-center gap-4 pb-6">
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
      )}
    </div>
  );
};

export default SmsHistory;
