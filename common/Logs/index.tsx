'use client';
import React, { useState, useEffect } from 'react'
import Header from './Header';
import Table from './Table';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PageInfo } from '@common';
import { getLogs } from '@service';

import type { LogsDataProps, ServerComponent } from '@types';

const mainStyle = {
  transform: 'scale(0.67)',
  transformOrigin: 'top left',
  width: '150%',
  height: '150%',
  overflow: 'hidden',
};

const Logs = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LogsDataProps[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const res = await getLogs(page, limit);
      if (res.success) {
        setData(res.data.data ?? []);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [page]);

  if (loading) return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      ></div>
    </div>
  );

  return (
    <div className="h-full flex flex-col font-poppins overflow-hidden">
      <div className="flex-shrink-0">
        <div className="flex w-full justify-between mb-4">
          <span className="screen-title">Logs</span>
        </div>
        <Header data={data} />
      </div>

      <div className="flex-grow overflow-auto">
        <Table data={data ?? []} />
      </div>

      {pagination && (
        <div className="flex-shrink-0 flex items-center justify-center gap-4 py-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={!pagination.hasPrevPage}
            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
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

export default Logs;